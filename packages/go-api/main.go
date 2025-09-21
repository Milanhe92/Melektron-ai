package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/xssnick/tonutils-go/address"
	"github.com/xssnick/tonutils-go/cell"
	"github.com/xssnick/tonutils-go/liteclient"
	"github.com/xssnick/tonutils-go/ton"
)

// Inicijalizuje TON API klijenta sa bazenom konekcija.
func initTONAPI() (*ton.APIClient, error) {
	client := liteclient.NewConnectionPool()
	// Za produkcionu mrezu koristite "https://ton-blockchain.github.io/global.config.json"
	configUrl := "https://ton-blockchain.github.io/testnet-global.config.json"
	
	err := client.AddConnectionsFromConfigUrl(context.Background(), configUrl)
	if err!= nil {
		return nil, err
	}

	api := ton.NewAPIClient(client).WithRetry() // Automatski ponovni pokusaji u slucaju neuspeha 
	log.Println("TON API klijent uspesno inicijalizovan.")
	return api, nil
}

// Handler za slanje eksterne poruke pametnom ugovoru.
func sendMessageHandler(w http.ResponseWriter, r *http.Request) {
	api, err := initTONAPI()
	if err!= nil {
		http.Error(w, "Greska pri inicijalizaciji TON API-ja", http.StatusInternalServerError)
		return
	}

	// Adresa ugovora (zamenite sa stvarnom adresom iz vaseg Tact ugovora)
	contractAddress := "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c"

	// Kreiranje poruke za slanje 
	messageBody := cell.BeginCell().MustStoreUInt(12345, 32).EndCell()

	addr := address.MustParseAddr(contractAddress)

	log.Printf("Slanje eksterne poruke na adresu ugovora: %s", addr.String())

	// Slanje poruke na blockchain 
	err = api.SendExternalMessage(context.Background(), addr, messageBody)
	if err!= nil {
		http.Error(w, "Greska pri slanju poruke na blockchain", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(byte("Poruka uspesno poslata na blockchain."))
}

func main() {
	http.HandleFunc("/send-message", sendMessageHandler)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server pokrenut na portu %s...", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}