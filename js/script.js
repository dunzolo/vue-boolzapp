const dt = luxon.DateTime;

const{
    createApp
} = Vue

createApp({
    data() {
        return {
            chat_active: 0,
            new_message: '',
            name_filter: '',
            message_active: {
                index: false,
                show: false
            },
            computer_answers: [
                'Ciao', 'Tutto bene', 'Sì, vengo anche io!', 'Termino l\'esercizio Boolean ed esco', 'Ok!', 'E tu come stai?', 'Ho comprato una macchina nuova', 'Ho rotto il telefono...'
            ],
            user: {
                name: 'Sofia',
                avatar: '_io'
            },
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                    ],
                }
            ]
        }
    },
    computed:{
        searchChat(){
            // let filteredChat;
            // if(this.name_filter != ''){
            //     for(let i = 0; i < this.contacts.length; i++){
            //         if(this.contacts[i].name.toLowerCase().includes(this.name_filter)){
            //             this.contacts[i].visible = true
            //         }
            //         else{
            //             this.contacts[i].visible = false
            //         }
            //     }
            //     filteredChat = this.contacts;
            // }
            // else{
            //     for(let i = 0; i < this.contacts.length; i++){
            //         this.contacts[i].visible = true
            //     }
            //     filteredChat = this.contacts;
            // }
            // return filteredChat;
            
            let filteredChat;
            if(this.name_filter != ''){
                filteredChat = this.contacts.filter((elem) => {
                    return elem.name.toLowerCase().includes(this.name_filter);
                })
                return filteredChat;
            }
            else{
                filteredChat = this.contacts;
            }
            return filteredChat;
        }
    },    
    methods: {
        splitDate(date){
            //divido la stringa con lo spazio, prendo il secondo elemento dell'array e prendo le prima 5 lettere
            let new_date = date.split(' ')[1].substring(0, 5);
            return new_date;
        },
        changeChat(index){
            this.message_active.index = false;
            this.message_active.show = false;
            this.chat_active = index
        },
        sendNewMessage(){
            let change_status_type = document.getElementById("change-status-type");
            if(this.new_message.trim()){
                let new_date = this.generateNewDate();
    
                let object = {
                    date: new_date,
                    message: this.new_message,
                    status: 'sent'
                };
                
                this.contacts[this.chat_active].messages.push(object);
                this.new_message = '';

                setTimeout(() => { change_status_type.innerText = "...sta scrivendo...";},500)
    
                setTimeout(() => {
                    change_status_type.innerText = "Online";

                    let new_date = this.generateNewDate();
    
                    let object = {
                        date: new_date,
                        message: this.randomAnswer(),
                        status: 'received'
                    }
    
                    this.contacts[this.chat_active].messages.push(object);
    
                },3000)

                setTimeout(() => { change_status_type.innerText = `Ultimo accesso alle ${this.hourLastMessageSent(this.chat_active)}`;}, 5000)
            }
        },
        hourLastMessageSent(index){
            let messages = this.contacts[index].messages;
            if(messages.length > 0){
                for(let i = 0; i < messages.length; i++){
                    if(messages[i].status.includes('received')){
                        let filter_messages = messages.filter((elem) => {
                            return elem.status.includes('received');
                        })
                        let date = this.splitDate(filter_messages[filter_messages.length - 1].date);
                        return date;
                    }
                }
            }
        },
        hourLastMessage(index, filteredChat){
            let messages = filteredChat[index].messages;
            if(messages.length > 0){
                let hour_last_message = this.splitDate(messages[messages.length - 1].date);
                return hour_last_message;
            }
        },
        lastMessage(index, filteredChat){
            let messages = filteredChat[index].messages;
            if(messages.length > 0){
                let last_message = messages[messages.length-1].message;
                if(last_message.length > 25){
                    last_message = last_message.substring(0,25) + '...'
                }
                else{
                    return last_message
                }
                return last_message;
            }
            console.log(this.chat_active);
        },
        generateNewDate(){
            // let today = new Date();
            // let new_date = today.getDate() + '/' + 
            //     (today.getMonth()+1) + '/' + 
            //     today.getFullYear() + ' ' + 
            //     today.getHours() + ':' + 
            //     ((today.getMinutes()<10 ? '0' : '') + today.getMinutes()) + ':' + 
            //     ((today.getSeconds()<10 ? '0' : '') + today.getSeconds());

            let now = dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
            
            return now;
        },
        dropdown(index){
            if(!(this.message_active.show)){
                if(this.message_active.index != false && this.message_active.index != index){
                    this.message_active.index = false;
                    this.message_active.show = false;
                }
    
                this.message_active.index = index;
                this.message_active.show = true;
            }
            else{
                this.message_active.show = false
            }
         },
         deleteMessage(index, filteredChat){
            filteredChat = filteredChat.splice(index, 1);
            this.dropdown(index);
            return filteredChat; 
         },
         randomAnswer(){
            let random = Math.floor(Math.random() * this.computer_answers.length - 1)
            return this.computer_answers[random];
         }
    },
}).mount('#app')