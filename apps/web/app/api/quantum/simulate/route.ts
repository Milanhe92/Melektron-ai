import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { checkUserCredits, deductCredits } from '@/lib/billing';
import { runQuantumSimulation } from '@melektron/quantum-core';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { 
      circuitData, 
      qubits = 4, 
      shots = 1000,
      algorithm = 'basic' 
    } = await req.json();
    
    // Calculate required credits based on complexity
    const complexity = qubits * shots / 1000;
    const requiredCredits = Math.ceil(complexity * (algorithm === 'advanced' ? 2 : 1));
    
    const credits = await checkUserCredits(session.user.id);
    
    if (credits < requiredCredits) {
      return NextResponse.json({ 
        error: 'Insufficient credits for quantum simulation', 
        required: requiredCredits,
        available: credits 
      }, { status: 402 });
    }

    // Run quantum simulation
    const simulationResult = await runQuantumSimulation({
      circuitData,
      qubits,
      shots,
      algorithm,
      userId: session.user.id
    });

    // Deduct credits
    await deductCredits(session.user.id, requiredCredits);

    return NextResponse.json({ 
      result: simulationResult,
      creditsUsed: requiredCredits,
      remainingCredits: credits - requiredCredits,
      executionTime: simulationResult.executionTime
    });

  } catch (error) {
    console.error('Quantum simulation error:', error);
    return NextResponse.json(
      { error: 'Quantum simulation failed' }, 
      { status: 500 }
    );
  }
}
