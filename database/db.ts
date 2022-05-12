import  { connect } from 'mongoose'



const db = async() => {
const host=process.env.HOST || 'mongodb+srv://comodoroCampos:4Cif9u-sc72N-E-@cluster0.evwlg.mongodb.net/test';
    try {
        await connect( host, {
        /** useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false */
        },()=>{
        console.log('Base de datos online');
        
    });
    

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}



export default db;
