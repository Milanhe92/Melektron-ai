// packages/contracts/Counter.tact
import "@stdlib/deploy";

// Poruka za inkrementiranje. Polje 'amount' je neophodno za primanje poruke.
// Ovo odgovara celiji koju Go API salje
message Increment {
    amount: Int as uint32;
}

// Pametni ugovor Counter sa stanjem `counter` i metodama za upravljanje njime.
contract Counter with Deploy<self> {
    
    // Deklaracija stanja ugovora.
    counter: Int as uint64;

    // Funkcija koja se poziva pri inicijalizaciji ugovora.
    init() {
        self.counter = 0; // Pocetna vrednost brojača.
    }

    // Metoda za prijem eksternih poruka.
    // Ugovor prepoznaje i obrađuje samo poruke tipa 'Increment'.
    receive(msg: Increment) {
        // Izbegavajte logiku koja bi mogla da baci izuzetak nakon `receive`.
        // To moze dovesti do skupe greske gde se takse naplate, ali radnja se ne izvrsi .
        self.counter = self.counter + msg.amount;
    }

    // Javni getter koji omogućava čitanje vrednosti brojača bez naknade.
    // GET metode ne menjaju stanje ugovora i ne trose gas.
    get fun counterValue(): Int {
        return self.counter;
    }
}