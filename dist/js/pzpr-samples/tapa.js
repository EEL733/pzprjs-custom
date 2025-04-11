/*! @license pzpr.js v5cacf43 (c) 2009-2025 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */
ui.debug.addRules("tapa",[{rules:"Shade some cells on the board.\n1. You cannot shade a cell with a number.\n 2. Numbers represent the lengths of the blocks of consecutive shaded cells in the (up to) eight cells surrounding the clue. Numbers aren't necessarily in order.\n 3. A question mark can be replaced by any positive number. If a cell only has a single question mark, the number is allowed to be zero.\n4. The shaded cells cannot form a 2x2 square.\n5. All shaded cells form an orthogonally contiguous area.",history:"This genre was invented by Serkan Yürekli."},{rules:"1. 盤面のいくつかのマスを黒く塗りましょう。\n2. 盤面の数字は、その数字のマスの周囲８マスを見た時に、連結してつながっている黒マスの数を表します。複数の数字がある場合は、それぞれの間が一つ以上の白マスで分かれていることを表します。\n 3. 数字の入っているマスを黒く塗ってはいけません。\n4. すべての黒マスはタテヨコにひとつながりになっていなければいけません。\n5. 黒マスを２×２以上のカタマリにしてはいけません。",history:"Serkan Yürekli氏発案"}]),ui.debug.addDebugData("tapa",{url:"5/5/3n5hchhajn2",failcheck:[["brNoShade","pzprv3/tapa/5/5"],["cs2x2","pzprv3/tapa/5/5/3 # . . . /# # . . 5 /# # 3,1,1 . . /3,1 . . . . /. . . . 2 /"],["ceTapaNe","pzprv3/tapa/5/5/3 # . . . /# # . . 5 /# . 3,1,1 . . /3,1 . . . . /. . . . 2 /"],["ceTapaNe","pzprv3/tapa/5/5/3 # . # # /# # . # 5 /# + 3,1,1 # # /3,1 # # # . /# # . . 2 /"],["csDivide","pzprv3/tapa/5/5/3 # . # # /# # . # 5 /# + 3,1,1 # # /3,1 # + # + /# # # # 2 /"],[null,"pzprv3/tapa/5/5/3 # # # # /# # . # 5 /# + 3,1,1 # # /3,1 # + # + /# # # # 2 /"]],inputs:[{input:["newboard,5,1","playmode","setconfig,use,1"]},{input:["ansclear","mouse,left, 1,1, 9,1","editmode","cursor,5,1","key,2,1,1","playmode"],result:"pzprv3/tapa/1/5/# # 2,1,1 # # /"},{input:["mouse,right, 1,1, 9,1"],result:"pzprv3/tapa/1/5/+ + 2,1,1 + + /"},{input:["editmode","newboard,5,1"]},{input:["cursor,1,1","key,-","key,right","key,0","key,right","key,1","key,right","key,2","key,right","key,1,0"],result:"pzprv3/tapa/1/5/- 0 1 2 0 /"},{input:["cursor,1,1","key,-","key,right","key,-","key,right","key,-","key,-","key,right, "],result:"pzprv3/tapa/1/5/- - -,- . 0 /"},{input:["cursor,1,1","key,-","key,right,-,-","key,right,-,-,-","key,right,-,-,-,-","key,right,-,-,-,-,-"],result:"pzprv3/tapa/1/5/- -,- -,-,- -,-,-,- - /"},{input:["newboard,5,1"]},{input:["cursor,1,1","key,8","key,right,9","key,right,5,1","key,right,5,2","key,right,-,3"],result:"pzprv3/tapa/1/5/8 . 5,1 2 -,3 /"},{input:["newboard,6,1"]},{input:["cursor,1,1","key,1,1,1","key,right,3,-,1","key,right,2,-,3","key,right,1,1,1,1","key,right,-,1,1,-","key,right,-,1,2,-"],result:"pzprv3/tapa/1/6/1,1,1 3,-,1 3 1,1,1,1 -,1,1,- - /"},{input:["newboard,6,1"]},{input:["cursor,0,0","mouse,leftx2, 1,1","mouse,leftx3, 3,1","mouse,leftx4, 5,1","mouse,leftx5, 7,1","mouse,leftx6, 9,1","mouse,rightx2, 11,1"],result:"pzprv3/tapa/1/6/- 0 1 2 3 1,1,1,1 /"},{input:["editmode","newboard,5,1"]},{input:["newboard,6,1"]},{input:["cursor,0,0","mouse,leftx2, 1,1","mouse,leftx3, 3,1","mouse,leftx4, 5,1","mouse,leftx5, 7,1","mouse,leftx6, 9,1","mouse,rightx2, 11,1"],result:"pzprv3/tapa/1/6/- 0 1 2 3 1,1,1,1 /"},{input:["newboard,7,1"]},{input:["cursor,0,0","mouse,leftx11, 1,1","mouse,leftx12, 3,1","mouse,leftx37, 5,1","mouse,leftx38, 7,1","mouse,leftx75, 9,1","mouse,leftx76, 11,1","mouse,leftx77, 13,1"],result:"pzprv3/tapa/1/7/8 -,- 5,1 -,-,- 3,1,1 1,1,1,1 . /"},{input:["newboard,9,1"]},{input:["cursor,0,0","mouse,rightx2, 1,1","mouse,rightx3, 3,1","mouse,rightx40, 5,1","mouse,rightx41, 7,1","mouse,rightx66, 9,1","mouse,rightx67, 11,1","mouse,rightx75, 13,1","mouse,rightx76, 15,1","mouse,rightx77, 17,1"],result:"pzprv3/tapa/1/9/1,1,1,1 3,1,1 -,-,- 5,1 -,- 8 0 - . /"},{input:["editmode,clear","mouse,left,5,1,11,1"],result:"pzprv3/tapa/1/9/1,1,1,1 3,1,1 . . . . 0 - . /"}]});
//# sourceMappingURL=tapa.js.map