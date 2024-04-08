# Sample Hardhat Project

先部署WrapEggFarm到base network,参数是eggfarm地址。

```shell
npm install
// ts-node未安装需要安装
// 修改diff.txt里面的难度为当前难度+2000
后台运行：ts-node ./scripts/egg_file/main.ts -k 你的手续费地址私钥 -r egg代币接受地址 -e base network's endpoint -o 2000 -w WrapEggFarm address -c 1
后台运行：ts-node ./scripts/egg_file/main.ts -k 你的手续费地址私钥 -r egg代币接受地址 -e base network's endpoint -o 2000 -w WrapEggFarm address -c 2
后台运行：ts-node ./scripts/egg_file/main.ts -k 你的手续费地址私钥 -r egg代币接受地址 -e base network's endpoint -o 2000 -w WrapEggFarm address -c 3
```
