# backend-migracyjniownik

Zrobiony za pomocą pnpm'a, jak nie masz to L (chociaż powinno nadal działać)

---

Gotowe do migracji:
- [x] Admins
- [ ] AdminPermissions
- [ ] Attributes
- [ ] AuthAccessTokens
- [ ] Blocks
- [ ] Emails
- [x] Events
- [x] Forms
- [ ] FormsDefinitions
- [ ] Participants
- [ ] ParticipantsAttributes
- [ ] ParticipantsAttributesLogs
- [ ] ParticipantsEmails
- [ ] ParticipantsForms
- [ ] Permissions

Reszta powinna być prosta tylko trzeba iść *według ciągu dependency*:

1. Najpierw `Admins` i `Forms`, u nich generujemy `uuidv4()`
2. Wsadzamy je do `Event`a i mają przez to powiązanie

Kod w miarę podzielony, nie super zrobiony i na pewno po za zasięgiem `solvro/config`a