interface ThreadIter{
    [key:number]:number
}

class Status {
    public threadIter:ThreadIter;
    public readonly base:bigint;
    public difficulty:bigint;

    public constructor(){
        this.threadIter = {}
        this.difficulty = BigInt(1)
        this.base = BigInt("0x10c6f7a0b5ed8d36b4c7f34938583621fafc8b0079a2834d26fa3fcc9ea9")
    }

    public addThread(threadIndex:number){
        this.threadIter[threadIndex] = 0
    }

    public incrementThreadIter(threadIndex:number, add_iter:number){
        this.threadIter[threadIndex] += add_iter
    }

    public resetThreadIter(threadIndex:number){
        this.threadIter[threadIndex] = 0
    }

    public getTarget(){
        return this.base / this.difficulty
    }

    public updateDifficulty(new_difficulty:bigint){
        this.difficulty = new_difficulty
    }
}

const threadStatus = new Status()
export default threadStatus