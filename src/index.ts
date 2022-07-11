import crypto from "crypto";

interface BlockShape {
  hash: string; // 해쉬값
  prevHash: string; // 이전 해쉬값
  height: number; // 블록의 위치
  data: string; // 보호할 데이터
}

// 블록의 hash rkqtdms prevHash, height, data 값을 이용해서 계산한다.
class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    // hash에 해쉬값 저장
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  // 해쉬값 생성
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  // 새로운 블록을 추가할땐 블록에 저장하고 싶은 데이터를 보내줘야한다.
  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(), // Block 클래스에 저장된 정보의 해쉬값
      this.blocks.length + 1, // 블록의 갯수
      data // 넣을 데이터
    );
    this.blocks.push(newBlock); // 블록에 추가된 해쉬값을 저장
  }
  public getBlocks() {
    return [...this.blocks];
  }
}

const blockchain = new Blockchain();

blockchain.addBlock("이화랑의 공인인증서");
blockchain.addBlock("이화랑의 주민등록증");
blockchain.addBlock("이화랑의 운전면허증");

console.log(blockchain.getBlocks());
