contract AccountRegistry {
    uint constant minStake = 1 ether;
    uint16 baseScore = 2000;

    event Challenge(address indexed from, address indexed to, uint amount);

    address owner;
    mapping(address => Account) public accounts;
    mapping((address, address) => Request) public requests;

    struct Request {
        address challenger;
        address other;
        uint amount;
    }

    struct Account {
        bool exists;
        string name;
        uint stake;
        uint16 score;
    }

    modifier isRegistered() {
        if (!accounts[msg.sender].exists) return;
        _
    }

    function register(string name) {
        if (msg.value < minStake) return;
        var account = accounts[msg.sender];
        account.exists = true;
        account.name = name;
        account.stake = msg.value;
        account.score = baseScore;
    }

    function deregister() isRegistered {
        var account = accounts[msg.sender];
        var stake = account.stake;
        delete accounts[msg.sender];
        msg.sender.send(stake);
    }

    function callout(address other) isRegistered {
        if (!accounts[other].exists) return;
        Challenge(msg.sender, other, msg.value);
    }

    function respond(
}
