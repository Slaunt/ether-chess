import './Match.sol';

contract AccountRegistry {
    uint constant minStake = 1 ether;
    uint16 baseScore = 2000;

    event Challenge(address indexed from, address indexed to, uint idx);
    event Accepted(uint indexed idx, address matchAddress);
    event Denied(uint indexed idx);

    MatchBroker public broker;
    address public owner;

    mapping(address => Account) public accounts;
    mapping(uint => Request) public requests;
    uint rCount;

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

    modifier onlyOwner() {
        if (msg.sender != owner) return;
        _
    }

    modifier isRegistered() {
        if (!accounts[msg.sender].exists) return;
        _
    }

    modifier response(uint rIdx) {
        var request = requests[rIdx];
        if (msg.sender != request.other) return;
        if (msg.value != request.amount) return;
        _
    }

    function AccountRegistry() {
        rCount = 0;
        owner = msg.sender;
    }

    function setBroker(address addr) onlyOwner {
        broker = MatchBroker(addr);
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
        var rIdx = rCount;
        rCount += 1;
        requests[rIdx] = Request(msg.sender, other, msg.value);
        Challenge(msg.sender, other, rIdx);
    }

    function accept(uint rIdx) isRegistered response(rIdx) {
        var request = requests[rIdx];
        var currentMatch = broker.setup(request.challenger, request.other);
        currentMatch.send(2 * request.amount);
        Accepted(rIdx, currentMatch);
    }

    function reject(uint rIdx) isRegistered response(rIdx) {
        delete requests[rIdx];
        Denied(rIdx);
    }

    function result(address win, address lose) {
        if (!accounts[win].exists) return;
        if (!accounts[lose].exists) return;
        // update score
        var winner = accounts[win];
        var loser = accounts[lose];
        winner.score += 1;
        loser.score -= 1;
    }
}
