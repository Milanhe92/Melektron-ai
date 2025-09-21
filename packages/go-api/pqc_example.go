// packages/go-api/pqc_example.go
package main

import (
    "fmt"
    "github.com/cloudflare/circl/kem"
    "github.com/cloudflare/circl/kem/schemes"
)

func main() {
    // 1. Odabir NIST-standardizovane ML-KEM-768 seme [3, 4]
    scheme := schemes.ML_KEM_768
    
    // 2. Generisanje para kljuceva (Alice)
    // Alice generise javni (pk) i privatni (sk) kljuc.[4]
    pkAlice, skAlice, err := scheme.GenerateKeyPair()
    if err!= nil {
        panic(err)
    }

    fmt.Println("Alice je generisala kljuceve.")
    
    // 3. Enkapsulacija (Bob)
    // Bob, koristeci Alicin javni kljuc, generise sifrovani tekst (ct)
    // i deljeni tajni kljuc (ss).[4]
    ct, ssBob, err := scheme.Encapsulate(pkAlice)
    if err!= nil {
        panic(err)
    }

    fmt.Println("Bob je enkapsulirao kljuc i poslao ga Alici.")

    // 4. Dekapsulacija (Alice)
    // Alice, koristeci svoj privatni kljuc (skAlice), desifruje
    // sifrovani tekst (ct) i dobija deljeni tajni kljuc (ss).[4]
    ssAlice, err := scheme.Decapsulate(skAlice, ct)
    if err!= nil {
        panic(err)
    }

    fmt.Println("Alice je dekapulirala kljuc.")

    // 5. Provera podudaranja deljenih tajnih kljuceva
    if string(ssAlice)!= string(ssBob) {
        fmt.Println("Greska: Deljeni tajni kljucevi se ne podudaraju!")
    } else {
        fmt.Println("Uspeh: Deljeni tajni kljucevi su uspesno razmenjeni i podudaraju se.")
    }
}