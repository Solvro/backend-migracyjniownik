-- AddForeignKey
ALTER TABLE "public"."AdminsPermissions" ADD CONSTRAINT "AdminsPermissions_adminUuid_fkey" FOREIGN KEY ("adminUuid") REFERENCES "public"."Admins"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminsPermissions" ADD CONSTRAINT "AdminsPermissions_eventUuid_fkey" FOREIGN KEY ("eventUuid") REFERENCES "public"."Events"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminsPermissions" ADD CONSTRAINT "AdminsPermissions_permissionUuid_fkey" FOREIGN KEY ("permissionUuid") REFERENCES "public"."Permissions"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Events" ADD CONSTRAINT "Events_organizerUuid_fkey" FOREIGN KEY ("organizerUuid") REFERENCES "public"."Admins"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Events" ADD CONSTRAINT "Events_registerFormUuid_fkey" FOREIGN KEY ("registerFormUuid") REFERENCES "public"."Forms"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attributes" ADD CONSTRAINT "Attributes_eventUuid_fkey" FOREIGN KEY ("eventUuid") REFERENCES "public"."Events"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Blocks" ADD CONSTRAINT "Blocks_parentUuid_fkey" FOREIGN KEY ("parentUuid") REFERENCES "public"."Blocks"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Blocks" ADD CONSTRAINT "Blocks_attributeUuid_fkey" FOREIGN KEY ("attributeUuid") REFERENCES "public"."Attributes"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Emails" ADD CONSTRAINT "Emails_eventUuid_fkey" FOREIGN KEY ("eventUuid") REFERENCES "public"."Events"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Emails" ADD CONSTRAINT "Emails_formUuid_fkey" FOREIGN KEY ("formUuid") REFERENCES "public"."Forms"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Forms" ADD CONSTRAINT "Forms_eventUuid_fkey" FOREIGN KEY ("eventUuid") REFERENCES "public"."Events"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FormsDefinitions" ADD CONSTRAINT "FormsDefinitions_attributeUuid_fkey" FOREIGN KEY ("attributeUuid") REFERENCES "public"."Attributes"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FormsDefinitions" ADD CONSTRAINT "FormsDefinitions_formUuid_fkey" FOREIGN KEY ("formUuid") REFERENCES "public"."Forms"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Participants" ADD CONSTRAINT "Participants_eventUuid_fkey" FOREIGN KEY ("eventUuid") REFERENCES "public"."Events"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ParticipantsAttributes" ADD CONSTRAINT "ParticipantsAttributes_participantUuid_fkey" FOREIGN KEY ("participantUuid") REFERENCES "public"."Participants"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ParticipantsAttributes" ADD CONSTRAINT "ParticipantsAttributes_attributeUuid_fkey" FOREIGN KEY ("attributeUuid") REFERENCES "public"."Attributes"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ParticipantsEmails" ADD CONSTRAINT "ParticipantsEmails_participantUuid_fkey" FOREIGN KEY ("participantUuid") REFERENCES "public"."Participants"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ParticipantsEmails" ADD CONSTRAINT "ParticipantsEmails_emailUuid_fkey" FOREIGN KEY ("emailUuid") REFERENCES "public"."Emails"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ParticipantsForms" ADD CONSTRAINT "ParticipantsForms_participantUuid_fkey" FOREIGN KEY ("participantUuid") REFERENCES "public"."Participants"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ParticipantsForms" ADD CONSTRAINT "ParticipantsForms_formUuid_fkey" FOREIGN KEY ("formUuid") REFERENCES "public"."Forms"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ParticipantsForms" ADD CONSTRAINT "ParticipantsForms_emailUuid_fkey" FOREIGN KEY ("emailUuid") REFERENCES "public"."Emails"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ParticipantsAttributesLogs" ADD CONSTRAINT "ParticipantsAttributesLogs_participantUuid_fkey" FOREIGN KEY ("participantUuid") REFERENCES "public"."Participants"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AuthAccessTokens" ADD CONSTRAINT "AuthAccessTokens_tokenable_id_fkey" FOREIGN KEY ("tokenable_id") REFERENCES "public"."Admins"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
