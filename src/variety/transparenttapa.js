//
// パズル固有スクリプト部 Transparent Tapa版 transparenttapa.js
//
(function(pidlist, classbase) {
	if (typeof module === "object" && module.exports) {
		module.exports = [pidlist, classbase];
	} else {
		pzpr.classmgr.makeCustom(pidlist, classbase);
	}
})(["transparenttapa"], {
	//---------------------------------------------------------
	// マウス入力系
	MouseEvent: {
		use: true,
		inputModes: {
			edit: ["number", "clear", "info-blk"],
			play: ["shade", "unshade", "peke", "info-blk"]
		},
		autoedit_func: "qnum",
		autoplay_func: "cell",
		mouseinput_clear: function() {
			var cell = this.getcell();
			if (cell.isnull || cell === this.mouseCell) {
				return;
			}

			cell.setQnums([]);
			cell.setQans(0);
			cell.setQsub(0);
			cell.draw();
			this.mouseCell = cell;
		},

		inputqnum: function() {
			var cell = this.getcell();
			if (cell.isnull || cell === this.mouseCell) {
				return;
			}

			if (cell !== this.cursor.getc()) {
				this.setcursor(cell);
			} else {
				this.inputqnum_tapa_main(cell);
			}
			this.mouseCell = cell;
		},
		inputqnum_tapa_main: function(cell) {
			var states = cell.qnum_states,
				state = 0;
			for (var i = 0; i < states.length; i++) {
				if (this.puzzle.pzpr.util.sameArray(cell.qnums, states[i])) {
					state = i;
					break;
				}
			}

			var isinc =
				this.inputMode === "number" ||
				(this.inputMode === "auto" && this.btn === "left");
			if (isinc) {
				if (state < states.length - 1) {
					state++;
				} else {
					state = 0;
				}
			} else {
				if (state > 0) {
					state--;
				} else {
					state = states.length - 1;
				}
			}
			cell.setQnums(states[state]);
			cell.setQans(0);
			cell.setQsub(0);

			cell.draw();
		}
	},

	//---------------------------------------------------------
	// キーボード入力系
	KeyEvent: {
		enablemake: true,

		keyinput: function(ca) {
			if (ca !== "-") {
				this.key_inputqnums(ca);
			}
		}
	},

	//---------------------------------------------------------
	// 盤面管理系
	Cell: {
		disInputHatena: true,
		minnum: 0,
		maxnum: 8,

		qnum_states: (function() {
			var states = [
				[],
				[0],
				[1],
				[2],
				[3],
				[4],
				[5],
				[6],
				[7],
				[8],
				[1, 1],
				[1, 2],
				[1, 3],
				[1, 4],
				[1, 5],
				[2, 2],
				[2, 3],
				[2, 4],
				[3, 3],
				[1, 1, 1],
				[1, 1, 2],
				[1, 1, 3],
				[1, 1, 4],
				[1, 2, 2],
				[1, 1, 1, 1]
			];
			return states;
		})(),

		isValidQnums: function(val) {
			if (val.length === 0) {
				return true;
			} else if (val.length === 1) {
				return val[0] <= 8;
			} else if (val.length === 2) {
				var sum = 0;
				for (var i = 0; i < val.length; i++) {
					if (val[i] === 0) {
						return false;
					}
					sum += val[i];
				}
				return sum <= 6;
			} else if (val.length === 3) {
				var sum = 0;
				var count = 0;
				for (var i = 0; i < val.length; i++) {
					if (val[i] === 0 || val[i] >= 5) {
						return false;
					}
					if (val[i] === 1) {
						count++;
					}
					sum += val[i];
				}
				if (count === 1) {
					return sum <= 5;
				} else if (count === 2) {
					return sum <= 6;
				} else if (count === 3) {
					return true;
				}
				return false;
			} else if (val.length === 4) {
				return val.toString() === [1, 1, 1, 1].toString();
			}

			return false;
		},

		//---------------------------------------------------------
		// そのセルと周囲8マスの3x3マスから
		// 黒マスのカタマリのマス数を取得する
		get3x3ShadedClusterLength: function() {
			var gird3x3 = [];
			var addrs = [
				[
					[-2, -2],
					[0, -2],
					[2, -2]
				],
				[
					[-2, 0],
					[0, 0],
					[2, 0]
				],
				[
					[-2, 2],
					[0, 2],
					[2, 2]
				]
			];
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					var cell = this.relcell(addrs[i][j][0], addrs[i][j][1]);
					gird3x3.push(!cell.isnull && cell.isShade() ? 1 : 0);
				}
			}

			var directions = [
				[1, 0],
				[-1, 0],
				[0, 1],
				[0, -1]
			];

			function dfs(x, y) {
				var count = 1;
				gird3x3[x + y * 3] = 0;

				for (var i = 0; i < directions.length; i++) {
					var nx = x + directions[i][0];
					var ny = y + directions[i][1];
					if (
						nx >= 0 &&
						nx < 3 &&
						ny >= 0 &&
						ny < 3 &&
						gird3x3[nx + ny * 3] === 1
					) {
						count += dfs(nx, ny);
					}
				}
				return count;
			}

			var result = [];
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					if (gird3x3[i * 3 + j] === 1) {
						result.push(dfs(j, i));
					}
				}
			}

			return result;
		}
	},

	Board: {
		hasborder: 1
	},

	AreaShadeGraph: {
		enabled: true,
		coloring: true
	},

	//---------------------------------------------------------
	// 画像表示系
	Graphic: {
		irowakeblk: true,
		qanscolor: "black",

		paint: function() {
			this.drawBGCells();
			this.drawShadedCells();
			this.drawDotCells();
			this.drawGrid();

			this.drawTapaNumbers();

			this.drawChassis();

			this.drawPekes();

			this.drawTarget();
		}
	},

	//---------------------------------------------------------
	// URLエンコード/デコード処理
	Encode: {
		decodePzpr: function(type) {
			this.decodeNumber_tapa();
		},
		encodePzpr: function(type) {
			this.encodeNumber_tapa();
		},

		decodeNumber_tapa: function() {
			var c = 0,
				i = 0,
				bstr = this.outbstr,
				bd = this.board;
			for (i = 0; i < bstr.length; i++) {
				var cell = bd.cell[c],
					ca = bstr.charAt(i);

				if (this.include(ca, "0", "8")) {
					cell.qnums = [parseInt(ca, 10)];
				} else if (ca === "9") {
					cell.qnums = [1, 1, 1, 1];
				} else if (this.include(ca, "a", "f")) {
					var num = parseInt(bstr.substr(i, 2), 36),
						val = [];
					if (num >= 360 && num < 396) {
						num -= 360;
						val = [0, 0];
						val[0] = (num / 6) | 0;
						num -= val[0] * 6;
						val[1] = num;
					} else if (num >= 396 && num < 521) {
						num -= 396;
						val = [0, 0, 0];
						val[0] = (num / 25) | 0;
						num -= val[0] * 25;
						val[1] = (num / 5) | 0;
						num -= val[1] * 5;
						val[2] = num;
					}
					cell.qnums = val;
					i++;
				} else if (ca >= "g" && ca <= "z") {
					c += parseInt(ca, 36) - 16;
				}

				c++;
				if (!bd.cell[c]) {
					break;
				}
			}
			this.outbstr = bstr.substr(i + 1);
		},
		encodeNumber_tapa: function() {
			var count = 0,
				cm = "",
				bd = this.board;
			for (var c = 0; c < bd.cell.length; c++) {
				var pstr = "",
					qn = bd.cell[c].qnums;

				if (qn.length === 1) {
					pstr = qn[0].toString(10);
				} else if (qn.length === 2) {
					pstr = (qn[0] * 6 + qn[1] + 360).toString(36);
				} else if (qn.length === 3) {
					pstr = (qn[0] * 25 + qn[1] * 5 + qn[2] + 396).toString(36);
				} else if (qn.length === 4) {
					pstr = "9";
				} else {
					count++;
				}

				if (count === 0) {
					cm += pstr;
				} else if (pstr || count === 20) {
					cm += (15 + count).toString(36) + pstr;
					count = 0;
				}
			}
			if (count > 0) {
				cm += (15 + count).toString(36);
			}

			this.outbstr += cm;
		}
	},
	//---------------------------------------------------------
	FileIO: {
		decodeData: function() {
			this.decodeCellQnumAns_transparenttapa();
			this.decodeBorderLine();
		},
		encodeData: function() {
			this.encodeCellQnumAns_transparenttapa();
			this.encodeBorderLineIfPresent();
		},

		decodeCellQnumAns_transparenttapa: function() {
			this.decodeCell(function(cell, ca) {
				if (ca === "#") {
					cell.qans = 1;
				} else if (ca !== ".") {
					var head = ca.slice(0, 1);
					if (head === "#") {
						cell.qans = 1;
						ca = ca.slice(1);
					}
					cell.qnums = [];
					var array = ca.split(/,/);
					for (var i = 0; i < array.length; i++) {
						cell.qnums.push(array[i] !== "-" ? +array[i] : -2);
					}
				}
			});
		},
		encodeCellQnumAns_transparenttapa: function() {
			this.encodeCell(function(cell) {
				if (cell.qnums.length > 0) {
					var array = [];
					for (var i = 0; i < cell.qnums.length; i++) {
						array.push(cell.qnums[i] >= 0 ? "" + cell.qnums[i] : "-");
					}
					if (cell.qans === 1) {
						return "#" + array.join(",") + " ";
					}
					return array.join(",") + " ";
				} else if (cell.qans === 1) {
					return "# ";
				} else {
					return ". ";
				}
			});
		}
	},

	//---------------------------------------------------------
	// 正解判定処理実行部
	AnsCheck: {
		checklist: [
			"checkShadeCellExist+",
			"check2x2ShadeCell",
			"checkCountOfClueCell",
			"checkConnectShade+"
		],

		checkCountOfClueCell: function() {
			this.checkAllCell(function(cell) {
				// trueになるマスがエラー扱い
				if (cell.qnums.length === 0) {
					return false;
				}
				var shades = cell.get3x3ShadedClusterLength(); // 順番の考慮は不要
				if (cell.qnums.length !== shades.length) {
					return true;
				}
				for (var i = 0; i < cell.qnums.length; i++) {
					var num = cell.qnums[i];
					if (num === -2) {
						continue;
					}
					var idx = shades.indexOf(num);
					if (idx < 0) {
						return true;
					}
					shades.splice(idx, 1);
				}
				return false;
			}, "ceTransparentTapaNe");
		}
	}
});
