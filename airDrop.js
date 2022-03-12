const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js");
const newPair = new Keypair();
console.log(newPair);

const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey
// Web3.js allows us to view the balance using the getBalance method inside the connection class that we had imported
const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
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
const airDropSol = async () => {
    try {
        // we need to create a connection object and a walletKeyPair object for the airdrop function.
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};
const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}
driverFunction();
