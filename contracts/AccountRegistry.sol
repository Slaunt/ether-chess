contract AccountRegistry {
    uint constant minStake = 1;
    address owner;
    mapping(address => Account) public accounts;

    struct Account {
        bool exists;
        string name;
        uint stake;
    }

    function register(string name) {
        if (msg.value < minStake) return;
        var account = accounts[msg.sender];
        account.exists = true;
        account.name = name;
        account.stake = msg.value;
    }

    function deregister() {
        var account = accounts[msg.sender];
        if (!account.exists) return;
        var stake = account.stake;
        delete accounts[msg.sender];
        msg.sender.send(stake);
    }
}
