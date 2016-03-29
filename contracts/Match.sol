contract ResultWatcher {
    function result(address win, address lose);
}

contract Match {
    event Move(address indexed matchAddress, uint16 idx, string desc);

    address public black;
    address public white;
    ResultWatcher watcher;
    uint16 move;
    string state;

    function Match(address b, address w, address callback) {
        black = b;
        white = w;
        watcher = ResultWatcher(callback);
    }
}

contract MatchBroker {
    address callback;

    function MatchBroker(address cb) {
        callback = cb;
    }

    function setup(address a, address b) returns (Match) {
        return new Match(a, b, callback);
    }
}
