contract Resolver {
    function result(address win, address lose);
}

contract Match {
    event Move(address indexed match, uint16 idx, string move);

    address public black;
    address public white;
    ResultWatcher watcher;
    uint16 move;
    byte32 state;

    function Match(address b, address w, address callback) {
        black = b;
        white = w;
        watcher = ResultWatcher(callback);
    }
}

contract MatchBroker {
    address callback;

    public MatchBroker(address cb) {
        callback = cb;
    }

    function setup(address a, address b) returns (Match match) {
        return new Match(a, b, callback);
    }
}
