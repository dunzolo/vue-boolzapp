const{
    createApp
} = Vue

createApp({
    data() {
        return {
            chat_active: 0,
            new_message: '',
            contacts: [
                {
                    name: 'Michele',
                    avatar: 'avatar_1.jpg',
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
                    avatar: 'avatar_2.jpg',
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
                    avatar: 'avatar_3.jpg',
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
                    avatar: 'avatar_4.jpg',
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
                    avatar: 'avatar_5.jpg',
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
                    avatar: 'avatar_6.jpg',
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
    created(){
        
    },    
    methods: {
        splitDate(date){
            //divido la stringa con lo spazio, prendo il secondo elemento dell'array e prendo le prima 5 lettere
            let new_date = date.split(' ')[1].substring(0, 5);
            return new_date;
        },
        changeChat(index){
            this.chat_active = index
        },
        sendNewMessage(){
            let new_date = this.generateNewDate();

 
            let object = {
                date: new_date,
                message: this.new_message,
                status: 'sent'
            };

            this.contacts[this.chat_active].messages.push(object);
            this.new_message = '';

            setTimeout(() => {
                let new_date = this.generateNewDate();

                let object = {
                    date: new_date,
                    message: 'ok',
                    status: 'received'
                }

                this.contacts[this.chat_active].messages.push(object);

            },1000)
        },
        generateNewDate(){
            let today = new Date();
            let new_date = today.getDate() + '/' + 
                (today.getMonth()+1) + '/' + 
                today.getFullYear() + ' ' + 
                today.getHours() + ':' + 
                ((today.getMinutes()<10 ? '0' : '') + today.getMinutes()) + ':' + 
                ((today.getSeconds()<10 ? '0' : '') + today.getSeconds());

            return new_date;
        }
    },
}).mount('#app')