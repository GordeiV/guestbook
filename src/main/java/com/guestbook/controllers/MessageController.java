package com.guestbook.controllers;

import com.guestbook.entities.Message;
import com.guestbook.services.MessageService;
import com.guestbook.util.RestEndpoints;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/message")
public class MessageController {
    private final MessageService messageService;

    public MessageController(@Qualifier("messageService") MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(messageService.getAll(), HttpStatus.OK);
    }

    @PostMapping(RestEndpoints.SAVE_MESSAGE)
    public ResponseEntity<?> saveMessage(@RequestBody Message message) {
        if(message.getUsername().length() > 20)
            return new ResponseEntity<>("The username should not contain more than 20 characters.", HttpStatus.BAD_REQUEST);

        Message savedMessage = messageService.saveMessage(message);
        return new ResponseEntity<>(savedMessage, HttpStatus.CREATED);
    }

    @DeleteMapping(RestEndpoints.DELETE_MESSAGE)
    public ResponseEntity<?> deleteMessage(@PathVariable Long id) {
        messageService.deleteMessage(id);
        return new ResponseEntity<String>(HttpStatus.OK);
    }
}
