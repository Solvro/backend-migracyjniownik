# backend-migracyjniownik

Zrobiony za pomocą pnpm'a, jak nie masz to L (chociaż powinno nadal działać)

---

Gotowe do migracji:
- [x] Admins
- [x] AdminPermissions
- [x] Attributes
- [ ] AuthAccessTokens
- [x] Blocks
- [x] Emails
- [x] Events
- [x] Forms
- [x] FormsDefinitions
- [x] Participants
- [x] ParticipantsAttributes
- [x] ParticipantsAttributesLogs
- [x] ParticipantsEmails
- [x] ParticipantsForms
- [x] Permissions

## Usage

1. Zrób czystą migracje Prismy
2. Usuń klucze obce z wygenerowanego pliku SQL migracji (ale zapisz je do jakiegoś pliku typu `foreign_keys.sql`)
3. `prisma migrate reset` robi baze bez kluczy
4. Ustaw w `.env` `DB_V2_URI` oraz `DB_V3_URI`
5. Zainstaluj dependency (np. `pnpm i` albo odpowiednikiem npm'a)` 
6. Uruchom (np. `pnpm start` albo odpowiednikiem npm'a)`
7. Migracja powinna dać rade (profit)
8. Zaaplikuj spowrotem klucze obce z `foreign_keys.sql` używając np. psql'a

Przykładowe klucze znajdują się w [foreign_keys.sql](https://github.com/Solvro/backend-migracyjniownik/blob/main/foreign_keys.sql), natomiast zalecam wygenerować i zastosować swoje jako iż struktura bazy może się różnić