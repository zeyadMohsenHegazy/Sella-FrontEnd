import { Component, ElementRef, ViewChild } from '@angular/core';
import { JWTService } from 'src/app/Services/jwt.service';

@Component({
  selector: 'app-chat-with-us',
  templateUrl: './chat-with-us.component.html',
  styleUrls: ['./chat-with-us.component.scss']
})
export class ChatWithUSComponent {
  title = 'chat-ui';

  constructor(private auth: JWTService) { }
  @ViewChild('chatListContainer') list?: ElementRef<HTMLDivElement>;

  chatInputMessage: string = "";

  human = {
    id: 1,
    profileImageUrl: "../../../assets/Images/Logo/man.png"
  }

  bot = {
    id: 2,
    profileImageUrl: "../../../assets/Images/Logo/sellaLogo.jpg"
  }

  chatMessages: {
    user: any,
    message: string ,
    timestamp :Date
    
  }[] = [
      {
        user: this.bot,
        message: "Hi , Message Us with Any questions. We're happy to help! ",
        timestamp: new Date()
      },
    ];

  ngAfterViewChecked() {
    this.scrollToBottom()
  }

  public FullName: string = "";
  send() {
    const fullNameFromToken = this.auth.GetFullNameFromToken();

    if (fullNameFromToken && fullNameFromToken.trim() !== "") {
      this.FullName = fullNameFromToken.trim();
    } else {
      this.FullName = "Customer";
    }

    const timestamp = new Date();

    this.chatMessages.push({
      message: this.chatInputMessage,
      user: this.human,
      timestamp : timestamp
      
    });

    if (this.chatInputMessage.indexOf('hello') !== -1) {
      this.chatMessages.push({
        message: 'Bot is typing...',
        user: this.bot,
        timestamp: new Date()
      });
      this.scrollToBottom();
      setTimeout(() => {
        this.chatMessages.pop();
        this.chatMessages.push({
          message: `Hello ${this.FullName} !`,
          user: this.bot,
          timestamp: new Date()
        });
        this.scrollToBottom();
      }, 2000);
      this.chatInputMessage = ""
      this.scrollToBottom()
    } else if (this.chatInputMessage.indexOf("What are your store hours?") !== -1) {
      this.chatMessages.push({
        message: 'Bot is typing...',
        user: this.bot,
        timestamp: new Date()
      });
      this.scrollToBottom();
      setTimeout(() => {
        this.chatMessages.pop();
        this.chatMessages.push({
          message: 'Sella store hours are Sunday to Thursday, 9am to 5pm.',
          user: this.bot,
          timestamp: new Date()
        });
        this.scrollToBottom();
      }, 2000);
      this.chatInputMessage = ""
      this.scrollToBottom()
    } else if (this.chatInputMessage.indexOf("Can you give me a phone number for store?") !== -1) {
      this.chatMessages.push({
        message: 'Bot is typing...',
        user: this.bot,
        timestamp: new Date()
      });
      this.scrollToBottom();
      setTimeout(() => {
        this.chatMessages.pop();
        this.chatMessages.push({
          message: 'Sella store phone number is 01202982836.',
          user: this.bot,
          timestamp: new Date()
        });
        this.scrollToBottom();
      }, 2000);
      this.chatInputMessage = ""
      this.scrollToBottom()
    } else if (this.chatInputMessage.indexOf("What is the store address?") !== -1) {
      this.chatMessages.push({
        message: 'Bot is typing...',
        user: this.bot,
        timestamp: new Date()
      });
      this.scrollToBottom();
      setTimeout(() => {
        this.chatMessages.pop();
        this.chatMessages.push({
          message: 'Sella store Address : Egypt , Cairo , Ain Shams , Ahmed Orabie Street.',
          user: this.bot,
          timestamp: new Date()
        });
        this.scrollToBottom();
      }, 2000);
      this.chatInputMessage = ""
      this.scrollToBottom()
    } else if (this.chatInputMessage.indexOf("Do you offer free shipping?") !== -1) {
      this.chatMessages.push({
        message: 'Bot is typing...',
        user: this.bot,
        timestamp: new Date()
      });
      this.scrollToBottom();
      setTimeout(() => {
        this.chatMessages.pop();
        this.chatMessages.push({
          message: 'Yes , We offer free shipping.',
          user: this.bot,
          timestamp: new Date()
        });
        this.scrollToBottom();
      }, 2000);
      this.chatInputMessage = ""
      this.scrollToBottom()
    } else if (this.chatInputMessage.indexOf("What payment methods do you accept?") !== -1) {
      this.chatMessages.push({
        message: 'Bot is typing...',
        user: this.bot,
        timestamp: new Date()
      });
      this.scrollToBottom();
      setTimeout(() => {
        this.chatMessages.pop();
        this.chatMessages.push({
          message: 'PayPal & Cash On Delivery.',
          user: this.bot,
          timestamp: new Date()
        });
        this.scrollToBottom();
      }, 2000);
      this.chatInputMessage = ""
      this.scrollToBottom()
    } else if (this.chatInputMessage.indexOf("Do you have any promotions or discounts?") !== -1) {
      this.chatMessages.push({
        message: 'Bot is typing...',
        user: this.bot,
        timestamp: new Date()
      });
      this.scrollToBottom();
      setTimeout(() => {
        this.chatMessages.pop();
        this.chatMessages.push({
          message: 'Yes , There is promotions & discounts. ',
          user: this.bot,
          timestamp: new Date()
        });
        this.scrollToBottom();
      }, 2000);
      this.chatInputMessage = ""
      this.scrollToBottom()
    } else {
      this.chatMessages.push({
        message: 'Bot is typing...',
        user: this.bot,
        timestamp: new Date()
      });
      this.scrollToBottom();
      setTimeout(() =>{
        this.chatMessages.pop();
        this.chatMessages.push({
          message: 'Please leave your message and we will reply to you as soon as possible. ',
          user: this.bot,
          timestamp: new Date()
        });
        this.scrollToBottom();
      }, 2000);
      this.chatInputMessage = ""
      this.scrollToBottom()
    }
  }

  scrollToBottom() {
    const maxScroll = this.list?.nativeElement.scrollHeight;
    this.list?.nativeElement.scrollTo({ top: maxScroll, behavior: 'smooth' });
  }

  generateFakeId(): string {
    const current = new Date();
    const timestamp = current.getTime();
    return timestamp.toString()
  }

  clearConversation() {

  }
}
