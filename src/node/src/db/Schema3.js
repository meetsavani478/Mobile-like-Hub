const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
    Iphone: [
        {
            image:
            [{
                img_1:{
                    type: String,
                    required: true,
                },
                
                img_2:{
                    type: String,
                    required: true,
                },
                
                img_3:{
                    type: String,
                    required: true,
                },
            }], 
            Price: {
                type: String,
                required: true,
            },
            Title: {
                type: String,
                required: true,
            },
            Brand:{
                type: String,
                required: true,
            },
            Operating_System:{
                type: String,
                required: true,
            },Memory_Storage:{
                type: String,
                required: true,
            },Screen_Size:{
                type: String,
                required: true,
            },Model_Name:{
                type: String,
                required: true,
            },	
            image_1:{
                type: String,
                required: true,
            },image_2:{
                type: String,
                required: true,
            },image_3:{
                type: String,
                required: true,
            },image_4:{
                type: String,
                required: true,
            }
        }
    ],
    Samsung: [
        {
            image:
            [{
                img_1:{
                    type: String,
                    required: true,
                },
                
                img_2:{
                    type: String,
                    required: true,
                },
                
                img_3:{
                    type: String,
                    required: true,
                },
            }],
            Price: {
                type: String,
                required: true,
            },
            Title: {
                type: String,
                required: true,
            },
            Brand:{
                type: String,
                required: true,
            },
            Operating_System:{
                type: String,
                required: true,
            },Memory_Storage:{
                type: String,
                required: true,
            },Screen_Size:{
                type: String,
                required: true,
            },Model_Name:{
                type: String,
                required: true,
            },	
            image_1:{
                type: String,
                required: true,
            },image_2:{
                type: String,
                required: true,
            },image_3:{
                type: String,
                required: true,
            },image_4:{
                type: String,
                required: true,
            }
        }
    ],
    OnePlus: [
        {
            image:
            [{
                img_1:{
                    type: String,
                    required: true,
                },
                
                img_2:{
                    type: String,
                    required: true,
                },
                
                img_3:{
                    type: String,
                    required: true,
                },
            }],
            Price: {
                type: String,
                required: true,
            },
            Title: {
                type: String,
                required: true,
            },
            Brand:{
                type: String,
                required: true,
            },
            Operating_System:{
                type: String,
                required: true,
            },Memory_Storage:{
                type: String,
                required: true,
            },Screen_Size:{
                type: String,
                required: true,
            },Model_Name:{
                type: String,
                required: true,
            },	
            image_1:{
                type: String,
                required: true,
            },image_2:{
                type: String,
                required: true,
            },image_3:{
                type: String,
                required: true,
            },image_4:{
                type: String,
                required: true,
            }
        }
    ],
    Motorola: [
        {
            image:
            [{
                img_1:{
                    type: String,
                    required: true,
                },
                
                img_2:{
                    type: String,
                    required: true,
                },
                
                img_3:{
                    type: String,
                    required: true,
                },
            }],
            Price: {
                type: String,
                required: true,
            },
            Title: {
                type: String,
                required: true,
            },
            Brand:{
                type: String,
                required: true,
            },
            Operating_System:{
                type: String,
                required: true,
            },Memory_Storage:{
                type: String,
                required: true,
            },Screen_Size:{
                type: String,
                required: true,
            },Model_Name:{
                type: String,
                required: true,
            },	
            image_1:{
                type: String,
                required: true,
            },image_2:{
                type: String,
                required: true,
            },image_3:{
                type: String,
                required: true,
            },image_4:{
                type: String,
                required: true,
            }
        }
    ],
    Vivo: [
        {
            image:
            [{
                img_1:{
                    type: String,
                    required: true,
                },
                
                img_2:{
                    type: String,
                    required: true,
                },
                
                img_3:{
                    type: String,
                    required: true,
                },
            }],
            Price: {
                type: String,
                required: true,
            },
            Title: {
                type: String,
                required: true,
            },
            Brand:{
                type: String,
                required: true,
            },
            Operating_System:{
                type: String,
                required: true,
            },Memory_Storage:{
                type: String,
                required: true,
            },Screen_Size:{
                type: String,
                required: true,
            },Model_Name:{
                type: String,
                required: true,
            },	
            image_1:{
                type: String,
                required: true,
            },image_2:{
                type: String,
                required: true,
            },image_3:{
                type: String,
                required: true,
            },image_4:{
                type: String,
                required: true,
            }
        }
    ],
    IQoo: [
        {
            image:
            [{
                img_1:{
                    type: String,
                    required: true,
                },
                
                img_2:{
                    type: String,
                    required: true,
                },
                
                img_3:{
                    type: String,
                    required: true,
                },
            }],
            Price: {
                type: String,
                required: true,
            },
            Title: {
                type: String,
                required: true,
            },
            Brand:{
                type: String,
                required: true,
            },
            Operating_System:{
                type: String,
                required: true,
            },Memory_Storage:{
                type: String,
                required: true,
            },Screen_Size:{
                type: String,
                required: true,
            },Model_Name:{
                type: String,
                required: true,
            },	
            image_1:{
                type: String,
                required: true,
            },image_2:{
                type: String,
                required: true,
            },image_3:{
                type: String,
                required: true,
            },image_4:{
                type: String,
                required: true,
            }
        }
    ],
});

const PhoneData = mongoose.model('PhoneData', phoneSchema);

module.exports = PhoneData;
