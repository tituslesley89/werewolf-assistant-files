export default {
    sessionStorageKey : "gameSessions",
    saveSession(session) {
        let sessionBlob = this._readFromLocalStorage();
        sessionBlob.sessions.push(session);
        this._saveToLocalStorage(sessionBlob);
    },
    getSessions() {
        return this._readFromLocalStorage().sessions;
    },
    deleteSession(sessionId) {
        let sessionBlob = this._readFromLocalStorage();
        sessionBlob.sessions.splice(sessionBlob.sessions.findIndex((session) => {
            return session.id === sessionId;
        }),
         1);
        this._saveToLocalStorage(sessionBlob);
    },
    _readFromLocalStorage() {
        if(!localStorage.getItem(this.sessionStorageKey)) {
            this._saveToLocalStorage(this.getNewSessionObject());
        }
        return JSON.parse(localStorage.getItem(this.sessionStorageKey));
    },
    _saveToLocalStorage(sessionBlob) {
        localStorage.setItem(this.sessionStorageKey, JSON.stringify(sessionBlob));
    },
    getNewSessionObject() {
        return this.getNewSessionObjectV1();
    },
    getNewSessionObjectV1() {
        return {
            version : "1",
            sessions : []
        };
    },
}