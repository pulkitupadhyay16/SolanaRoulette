const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js");
const web3=require("@solana/web3.js");
const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
//For checking whether the connection is successfully made
// console.log(connection);
// const userWallet=web3.Keypair.generate();
// console.log(userWallet);
let userPublicKey= [
    178,  93,   5,  58,  70,  32,  59, 249,
    177,  52,  76,  78, 127, 227, 229, 223,
     14,  53, 152, 104, 194, 121, 199,  64,
    221, 174,  84, 235,  12, 124, 238,  60 
  ];
  let userSecretKey= [
    22,  14, 132,  45, 209, 44,  22, 236, 199, 220, 163,
    42,  46,  70, 195, 212,  0, 247, 225, 181,  10, 255,
   235, 116,  98, 230, 255, 46, 212, 116,  35, 213, 178,
    93,   5,  58,  70,  32, 59, 249, 177,  52,  76,  78,
   127, 227, 229, 223,  14, 53, 152, 104, 194, 121, 199,
    64, 221, 174,  84, 235, 12, 124, 238,  60
 ];
 const userWallet=web3.Keypair.fromSecretKey(Uint8Array.from(userSecretKey));
 const airDropSol = async () => {
    try {
        // we need to create a connection object and a walletKeyPair object for the airdrop function.
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair =await Keypair.fromSecretKey(Uint8Array.from(userSecretKey));
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};
const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet =await Keypair.fromSecretKey(Uint8Array.from(userSecretKey));

        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
        );
        console.log(`Wallet balance: ${walletBalance}`);
        // Apart from the main network (called mainnet), Solana also maintains clusters called devnet and testnet.
        //  Devnet is the replica of the Solana’s mainnet, and serves as a playground for anyone who wants to try out the features of Solana.
        //  clusterApiUrl provides us the URL for devnet that we’ll be passing to create our connection object so that we get details of devnet.
    } catch (err) {
        console.log(err);
    }
};
airDropSol();
getWalletBalance();