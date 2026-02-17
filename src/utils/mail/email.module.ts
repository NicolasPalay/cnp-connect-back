import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailService } from "./email.service";
import { TokenService } from "src/auth/token.service";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
          user: "process.env.USER",
          pass: "process.env.PASS",
        },
        // @dev controler avec formateur l'erreur de certificat: "self-signed certificate in certificate chain"
        tls: {
          rejectUnauthorized: false, // ⚠️ désactive la vérif SSL
        },
      },
      defaults: {
        from: '"CNP Connect" <nicolassam33@gmail.com>',
      },
    }),
  ],
  providers: [EmailService, TokenService],
  exports: [EmailService],
})
export class EmailModule {}
