package com.aidlebanon.AidLebanon.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "http://localhost:3000")
public class EmailController {

  @Autowired
  private JavaMailSender javaMailSender;

  @PostMapping("/send")
  public ResponseEntity<Map<String, String>> sendEmail(@RequestBody EmailRequest emailRequest) {
    Map<String, String> response = new HashMap<>();
    try {
      // Compose and send the email
      SimpleMailMessage message = new SimpleMailMessage();
      message.setTo(emailRequest.getEmail());
      message.setSubject("Password Reset");
      message.setText(emailRequest.getMessage());
      javaMailSender.send(message);

      // Success response
      response.put("status", "success");
      response.put("message", "Email sent successfully!");
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      // Error response
      response.put("status", "error");
      response.put("message", "Failed to send email. Please check the server logs.");
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
  }
}
class EmailRequest {
	private String email;
	private String message;

	// Getters and setters
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
