const { Sequelize, DataTypes, Op }=require("sequelize");

const sequelize=new Sequelize("sequelize-tutorial", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

async function main(){
    try{
        //Authenticate the connection
        await sequelize.authenticate();
        console.log("Database authenticated successfully");

        //I want to use a table that has already been in the database. No re-defining it just pure usage
        const userModel=sequelize.define("user", {
            user_id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username:{
               type: DataTypes.STRING,
               allowNull: false
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false
            },
            age:{
                type: DataTypes.INTEGER,
                defaultValue: 21
            },
            description:{
                type: DataTypes.STRING
            },
            email:{
                type: DataTypes.STRING
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        });

        // const result=await userModel.findOne();
        // console.log(result.username);

        await userModel.sync({alter: true});
        // console.log("Model synced");
        const data=await userModel.create({
            username: "Greg",
            password: "test",
            age: 25,
            email: "abc@gmail.com"
        });
        console.log("user created");
    }
    catch(error){
        console.log("Some error has occurred. ", error.message);
        sequelize.close();
    }
}

main();