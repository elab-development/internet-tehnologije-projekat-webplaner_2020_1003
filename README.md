# Web Planners

Web Planeri je aplikacija koja omogućava korisnicima da pregledaju sve dostupne planere iz naše ponude i lako pronađu planer koji odgovara njihovim potrebama. Planeri se mogu filtrirati po kategoriji, nazivu ili opisu, kao i sortirati rastuće ili opadajuće u zavisnosti od cene.  

Aplikacija takođe omogućava pregled planera kroz više strana, koristeći dugmiće za navigaciju između stranica, čime se olakšava pretraga i preglednost većeg broja planera.

## Tehnologije korišćene u projektu

- **Frontend**: React
- **Backend**: Laravel
- **Baza podataka**: MySQL

## Funkcionalnosti
### 1. Neulogovani korisnik
- Registracija
- Prijava
- Keširanje na FAQ stranici

### 2. Ulogovani korisnik
- Keširanje na FAQ stranici
- Prikaz svih dostupnih planera
- Filtriranje po kategoriji planera
- Pretraga planera po nazivu ili opisu
- Sortiranje po kriterijumu cene (rastuće/opadajuće)
- Paginacija
- Odjava

### 3. Administrator
- Keširanje na FAQ stranici
- Pristup svim planerima 
- Dodavanje novih planera
- Izmena postojećih planera
- Brisanje postojećih planera
- Pristup svim kategorijama planera
- Dodavanje novih kategorija
- Brisanje postojećih kategorija
- Odjava

# Pokretanje projekta 

## Kloniranje repozitorijuma

```bash
git clone https://github.com/elab-development/internet-tehnologije-projekat-webplaner_2020_1003.git
cd internet-tehnologije-projekat-webplaner_2020_1003
```
## Backend

1. Pređi u direktorijum backend-a:
    ```bash
    cd backend
    ```
2. Instaliraj zavisnosti:
    ```bash
    composer install
    ```
3. Kopiraj `.env` datoteku:
    ```bash
    cp .env.example .env
    ```
4. Generiši novi API ključ:
    ```bash
    php artisan key:generate
    ```
5. Pokreni migracije baze podataka i inicijalizuj podatke:
    ```bash
    php artisan migrate:fresh --seed
    ```
6. Pokreni backend server:
    ```bash
    php artisan serve
    ```
 
### Frontend

1. Pređi u direktorijum frontend-a:
    ```bash
    cd frontend
    ```
2. Instaliraj zavisnosti:
    ```bash
    npm install
    ```
3. Pokreni frontend server:
    ```bash
    npm start
    ```   
