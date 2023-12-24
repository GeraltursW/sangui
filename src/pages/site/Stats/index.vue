<template>
	<div class="wrapper">
		<div class="left-elements">
			<div class="cus-button" @click="setTarget">设置总数</div>
			<div class="cus-button" @click="setParams">设置参数</div>

			<div class="card">
				<p class="heading">
					目标:{{ target }}
				</p>
				<p>
					当前总数
				</p>
				<p>{{ finalPoints }}</p>
			</div>
		</div>
		<div class="mid-elements">

		</div>


		<div class="right-elements">
			<el-card class="box-card">
				<el-form :model="form" label-width="120px">
					<el-row>
						<el-col :span="18">
							<label class="switch">
								<input checked="" type="checkbox" class="toggle" v-model="form.win">
								<span class="slider"></span>
								<span class="card-side"></span>
							</label>
						</el-col>


						<el-col :span="6">
							<div style="display: flex;">
								<p style="font-size: 20px;">总点数:
								</p>
								<p :class="{ 'black-text': calculateTotalPoints > 0, 'red-text': calculateTotalPoints < 0 }"
									style="font-size: 20px;margin-left: 10px;">
									{{ calculateTotalPoints }}</p>
							</div>


						</el-col>
					</el-row>

					<el-row style="margin-top: 10px;">
						<el-col :span="12">
							<el-form-item label="击杀数">
								<el-input-number v-model="form.kill" :min="0" :max="100" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="单杀数">
								<el-input-number v-model="form.soloKill" :min="0" :max="100" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="死亡数">
								<el-input-number v-model="form.death" :min="0" :max="100" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="被单杀数">
								<el-input-number v-model="form.soloDeath" :min="0" :max="100" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="MVP">
								<el-switch v-model="form.mvp" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="对位MVP">
								<el-switch v-model="form.compMvp" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="超神">
								<el-switch v-model="form.godlike" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="对位超神">
								<el-switch v-model="form.compGodlike" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="超鬼">
								<el-switch v-model="form.ghostlike" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="评分最低">
								<el-switch v-model="form.lowest" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="四杀次数">
								<el-input-number v-model="form.quadr" :min="0" :max="100" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="五杀次数">
								<el-input-number v-model="form.penta" :min="0" :max="100" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="对位四杀">
								<el-input-number v-model="form.compQuadr" :min="0" :max="100" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="对位五杀">
								<el-input-number v-model="form.compPenta" :min="0" :max="100" />
							</el-form-item>
						</el-col>
					</el-row>

					<div class="form-btn">

						<el-button type="primary" @click="confirmEvent">确定</el-button>
						<el-button type="info" @click="reset">重置</el-button>
					</div>

				</el-form>
			</el-card>
		</div>

		<el-dialog v-model="targetVisible" title="设置目标" destroy-on-close width="400px">
			<el-form :model="form2" label-width="120px">
				<el-row style="margin-top: 10px;">
					<el-col :span="24">
						<el-form-item label="目标总数">
							<el-input-number v-model="form2.target" :min="0" :max="99999" />

						</el-form-item>
					</el-col>

				</el-row>

				<div class="form-btn">
					<el-button type="primary" @click="targetConfirm">确定</el-button>
				</div>

			</el-form>
		</el-dialog>
		<el-dialog v-model="paramsVisible" title="设置目标" destroy-on-close>
			<el-form :model="form" label-width="120px">
				<el-row style="margin-top: 10px;">
					<el-col :span="12">
						<el-form-item label="赢">
							<el-input-number v-model="paramsList.win" :min="0" :max="99999" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="输">
							<el-input-number v-model="paramsList.lose" :min="0" :max="99999" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row style="margin-top: 10px;">
					<el-col :span="12">
						<el-form-item label="击杀">
							<el-input-number v-model="paramsList.kill" :min="0" :max="99999" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="单杀">
							<el-input-number v-model="paramsList.soloKill" :min="0" :max="99999" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="死亡">
							<el-input-number v-model="paramsList.death" :min="0" :max="99999" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="被单杀">
							<el-input-number v-model="paramsList.soloDeath" :min="0" :max="99999" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="MVP">
							<el-input-number v-model="paramsList.mvp" :min="0" :max="99999" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="对位MVP">
							<el-input-number v-model="paramsList.compMvp" :min="0" :max="99999" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="超神">
							<el-input-number v-model="paramsList.godlike" :min="0" :max="99999" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="对位超神">
							<el-input-number v-model="paramsList.compGodlike" :min="0" :max="99999" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="超鬼">
							<el-input-number v-model="paramsList.ghostlike" :min="0" :max="99999" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="评分最低">
							<el-input-number v-model="paramsList.lowest" :min="0" :max="99999" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="四杀">
							<el-input-number v-model="paramsList.quadr" :min="0" :max="100" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="五杀">
							<el-input-number v-model="paramsList.penta" :min="0" :max="100" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="对位四杀">
							<el-input-number v-model="paramsList.compQuadr" :min="0" :max="100" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="对位五杀">
							<el-input-number v-model="paramsList.compPenta" :min="0" :max="100" />
						</el-form-item>
					</el-col>
				</el-row>
				<div class="form-btn">
					<el-button type="primary" @click="confirmParams">确定</el-button>
					<el-button type="info" @click="resetParams">重置</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>
        
<script  setup lang="ts">
import { ref, provide, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { roleList } from './stats.data'
import './style.less'

//目标弹窗
const targetVisible = ref<Boolean>(false)
//参数弹窗
const paramsVisible = ref<Boolean>(false)
//控制弹窗显示
function setTarget() {
	targetVisible.value = true
}


function setParams() {
	paramsVisible.value = true
}

//目标内容
const form2 = ref({
	target: ""
})
//参数内容
const paramsList = ref({
	win: 0,
	lose: 0,
	kill: 0,
	soloKill: 0,
	death: 0,
	soloDeath: 0,
	godlike: 0,
	compGodlike: 0,
	ghostlike: 0,
	lowest: 0,
	mvp: 0,
	compMvp: 0,
	quadr: 0,
	penta: 0,
	compQuadr: 0,
	compPenta: 0,
})
//表单内容
const form = ref({
	win: true,
	kill: 0,
	soloKill: 0,
	death: 0,
	soloDeath: 0,
	godlike: false,
	compGodlike: false,
	ghostlike: false,
	lowest: false,
	mvp: false,
	compMvp: false,
	quadr: 0,
	penta: 0,
	compQuadr: 0,
	compPenta: 0,
})


const pointRules = ref({
	win: 0,
	lose: 0,
	kill: 0,
	soloKill: 0,
	death: 0,
	soloDeath: 0,
	godlike: 0,
	compGodlike: 0,
	ghostlike: 0,
	lowest: 0,
	mvp: 0,
	compMvp: 0,
	quadr: 0,
	penta: 0,
	compQuadr: 0,
	compPenta: 0,
});
//总得分计算属性
const calculateTotalPoints = computed(() => {
	let totalPoints = 0;

	// Add points for each kill, soloKill, death, soloDeath, quadr, penta
	totalPoints += form.value.kill * pointRules.value.kill;
	totalPoints += form.value.soloKill * pointRules.value.soloKill;
	totalPoints += form.value.death * pointRules.value.death;
	totalPoints += form.value.soloDeath * pointRules.value.soloDeath;
	totalPoints += form.value.quadr * pointRules.value.quadr;
	totalPoints += form.value.penta * pointRules.value.penta;

	// Add points for godlike, compGodlike, mvp, compMvp (maximum once)
	totalPoints += form.value.win ? pointRules.value.win : pointRules.value.lose;
	totalPoints += form.value.godlike ? pointRules.value.godlike : 0;
	totalPoints += form.value.compGodlike ? pointRules.value.compGodlike : 0;
	totalPoints += form.value.mvp ? pointRules.value.mvp : 0;
	totalPoints += form.value.compMvp ? pointRules.value.compMvp : 0;

	// Add points for compQuadr, compPenta
	totalPoints += form.value.compQuadr * pointRules.value.compQuadr;
	totalPoints += form.value.compPenta * pointRules.value.compPenta;

	return totalPoints;
});
//目标数
const target = ref()
//已经获得的数量
const finalPoints = ref()
finalPoints.value = localStorage.getItem('finalPoints')
//从本地存储拿
target.value = localStorage.getItem('target')


//确定目标总数
function targetConfirm() {
	localStorage.setItem("target", form2.value.target);
	target.value = localStorage.getItem('target')
	//设置总数的时候 清除当前数
	localStorage.removeItem('finalPoints')
	finalPoints.value = 0
	targetVisible.value = false
	console.log(target.value);
}



const reset = () => {
	init()
}
function confirmEvent() {
	finalPoints.value += calculateTotalPoints.value
	localStorage.setItem('finalPoints', finalPoints.value)
	option.value.series[0].data[0] = 20
	dialogVisible.value = false
	ElMessage({
		message: '获得' + calculateTotalPoints.value + '点积分',
		type: 'success',
	})
}

//确定参数的值
function confirmParams() {
	// 循环存储数据到localStorage
	Object.keys(paramsList.value).forEach(key => {
		localStorage.setItem(key, paramsList.value[key]);
	});
	// 循环从localStorage中读取数据并赋值给pointRules
	Object.keys(pointRules.value).forEach(key => {
		const storedValue = localStorage.getItem(key);
		if (storedValue !== null) {
			pointRules.value[key] = parseInt(storedValue, 10);
		}
	});
	paramsVisible.value = false
}
//初始化form的值
function init() {
	form.value = {
		win: true,
		kill: 0,
		soloKill: 0,
		death: 0,
		soloDeath: 0,
		godlike: false,
		compGodlike: false,
		mvp: false,
		compMvp: false,
		quadr: 0,
		penta: 0,
		compQuadr: 0,
		compPenta: 0,
	}
}
</script>
<style lang="less" scoped >
//整体样式布局
.wrapper {
	position: relative;
	display: flex;
	gap: 2rem;
	top: 200px;
	padding: 0 1.5em;

	.left-elements {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		// margin-left: 40px;
		flex: 1;
	}

	.mid-elements {
		flex: 1;
	}

	.right-elements {
		flex: 4;
	}
}




.switch {
	--input-focus: rgb(0, 218, 80);
	--bg-color: #fff;
	--bg-color-alt: #666;
	--main-color: #323232;
	--input-out-of-focus: #ccc;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 30px;
	width: 70px;
	height: 36px;
	transform: translateX(calc(50% - 10px));
	font-weight: bold;
	font-size: 20px;
}

.toggle {
	opacity: 0;
}

.slider {
	box-sizing: border-box;
	border-radius: 100px;
	border: 2px solid var(--main-color);
	box-shadow: 4px 4px var(--main-color);
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: var(--input-out-of-focus);
	transition: 0.3s;
}

.slider:before {
	content: "输";
	box-sizing: border-box;
	height: 30px;
	width: 30px;
	position: absolute;
	left: 2px;
	bottom: 1px;
	border: 2px solid var(--main-color);
	border-radius: 100px;
	background-color: var(--bg-color);
	color: var(--main-color);
	font-size: 14px;
	font-weight: 600;
	text-align: center;
	line-height: 25px;
	transition: 0.3s;
}

.toggle:checked+.slider {
	background-color: var(--input-focus);
	transform: translateX(-32px);
}

.toggle:checked+.slider:before {
	content: "赢";
	transform: translateX(32px);
}



.form-btn {
	display: flex;
	justify-content: center;
	align-items: center;
}

.black-text {
	color: black;
}

.red-text {
	color: red;
}




.chart {
	height: 61vh;
}
</style>