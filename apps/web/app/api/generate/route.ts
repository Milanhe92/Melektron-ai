import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { checkUserCredits, deductCredits } from '@/lib/billing';
import { generateAIContent } from '@melektron/ai-core';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { prompt, type = 'basic' } = await req.json();
    
    // Check user credits
    const credits = await checkUserCredits(session.user.id);
    const requiredCredits = type === 'advanced' ? 5 : 1;
    
    if (credits < requiredCredits) {
      return NextResponse.json({ 
        error: 'Insufficient credits', 
        required: requiredCredits,
        available: credits 
      }, { status: 402 });
    }

    // Generate AI content
    const result = await generateAIContent({
      prompt,
      type,
      userId: session.user.id
    });

    // Deduct credits
    await deductCredits(session.user.id, requiredCredits);

    return NextResponse.json({ 
      result,
      creditsUsed: requiredCredits,
      remainingCredits: credits - requiredCredits
    });

  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'AI generation failed' }, 
      { status: 500 }
    );
  }
}
