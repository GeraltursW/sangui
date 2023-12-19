<template>
	<div class="wrapper">
		<div class="container">
			<div class="top-banner">
				<div class="radar-chart">
					<v-chart class="chart" :option="option2"></v-chart>
				</div>

				<div class="top-banner-content">
					<button id="bottone5" @click="setTarget">设置总数</button>
					<h3>目标:{{ target }}</h3>
					<h3>当前总数:{{ finalPoints }}</h3>
				</div>
			</div>



			<div class="banner">
				<div v-for="item in roleList" :key="item.id" class="element">
					<p>{{ item.roleName }}</p>
					<a :href="item.linkUrl" target="_blank">
						<img :src="item.imgUrl" class="logo">
					</a>
					<el-button type="primary" @click="handleModal(item.id)" plain>进入计算</el-button>
				</div>
			</div>
		</div>
		<!-- <div class="line-chart" style="margin-top: 20px;">
			<v-chart class="chart" :option="option" />
		</div> -->
		<el-dialog v-model="targetVisible" title="设置目标" destroy-on-close>
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
		<el-dialog v-model="dialogVisible" title="园长数据统计" destroy-on-close>
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
		</el-dialog>
	</div>
</template>
        
<script  setup lang="ts">
import { ref, provide, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, RadarChart } from "echarts/charts";
import {
	GridComponent,
	TitleComponent,
	TooltipComponent,
	LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { roleList } from './stats.data'


use([
	CanvasRenderer,
	RadarChart,
	LineChart,
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent
]);

provide(THEME_KEY, "light");
//弹窗显示
const dialogVisible = ref<Boolean>(false)
//目标弹窗
const targetVisible = ref<Boolean>(false)
//目标内容
const form2 = ref({
	target: ""
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
	win: 5,
	kill: 1,
	soloKill: 5,
	death: -3,
	soloDeath: -5,
	godlike: 20,
	compGodlike: -20,
	ghostlike: -20,
	lowest: -40,
	mvp: 2,
	compMvp: -20,
	quadr: 40,
	penta: 100,
	compQuadr: -40,
	compPenta: -100,
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
	totalPoints += form.value.win ? pointRules.value.win : -20;
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
function setTarget() {
	targetVisible.value = true
}

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

watch(finalPoints, (newVal, oldVal) => {

})

const option = ref({
	title: {
		text: '最近走势',
		left: 'center'
	},
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b} : {c}'
	},
	legend: {
		left: 'left'
	},
	xAxis: {
		type: 'category',
		name: 'x',
		splitLine: { show: false },
		data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	yAxis: {
		type: 'log',
		name: 'y',
		minorSplitLine: {
			show: true
		}
	},
	series: [
		{
			name: '芜湖神',
			type: 'line',
			data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669]
		},
		{
			name: '彩旗',
			type: 'line',
			data: [1, 2, 0.3, 8, 16, 32, 64, 128, 256]
		},
		{
			name: '公公',
			type: 'line',
			data: [
				1 / 2,
				1 / 4,
				1 / 8,
				1 / 16,
				1 / 32,
				1 / 64,
				1 / 128,
				1 / 256,
				1 / 512
			]
		}
	]
});

const option2 = ref({
	title: {
		text: '三人雷达图'
	},
	legend: {
		data: ['芜湖神', '古手羽', '彩旗']
	},
	radar: {
		// shape: 'circle',
		indicator: [
			{ name: '场均击杀', max: 30 },
			{ name: '五杀', max: 3 },
			{ name: '场均单杀', max: 20 },
			{ name: '场均死亡', max: 20 },
			{ name: '四杀', max: 3 },
			{ name: 'mvp率', max: 1 },
		]
	},
	series: [
		{
			name: 'Budget vs spending',
			type: 'radar',
			data: [
				{
					value: [11, 1, 3, 5, 1, 0.2],
					name: '芜湖神'
				},
				{
					value: [20, 2, 10, 3, 2, 0.8],
					name: '古手羽'
				},
				{
					value: [25, 3, 15, 2, 3, 0.9],
					name: '彩旗'
				}
			]
		}
	]
})


function handleModal() {
	init()
	calculateTotalPoints.value = 0
	dialogVisible.value = true
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
.wrapper {
	.container {
		display: flex;
		flex-direction: column;

		.banner {
			display: flex;
			justify-content: space-between;

			.element {
				height: 100%;
				padding: .2em .5em;
				display: flex;
				flex-direction: column;
				gap: 1.5rem;

				p {
					padding: 0 1.5rem;
					font-size: 20px;
					font-weight: bold;
					color: #0D2F3F;
				}
			}
		}

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

.logo {
	width: 10em;
	height: 10em;
	padding: 1.5rem;
	will-change: filter;
	transition: filter 300ms;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #df51bbaa);
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


.top-banner {
	display: flex;
	justify-content: space-evenly;

	.radar-chart {
		width: 80vw;
	}

	.top-banner-content {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
		padding: 1.5em .2em;
	}
}

.chart {
	height: 61vh;
}

#bottone5 {
	align-items: center;
	background-color: #FFFFFF;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: .25rem;
	box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
	box-sizing: border-box;
	color: rgba(0, 0, 0, 0.85);
	cursor: pointer;
	display: inline-flex;
	font-family: system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 16px;
	font-weight: 600;
	justify-content: center;
	line-height: 1.25;
	min-height: 3rem;
	padding: calc(.875rem - 1px) calc(1.5rem - 1px);
	text-decoration: none;
	transition: all 250ms;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	vertical-align: baseline;
	width: auto;
}

#bottone5:hover,
#bottone5:focus {
	border-color: rgba(0, 0, 0, 0.15);
	box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
	color: rgba(0, 0, 0, 0.65);
}

#bottone5:hover {
	transform: translateY(-1px);
}

#bottone5:active {
	background-color: #F0F0F1;
	border-color: rgba(0, 0, 0, 0.15);
	box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
	color: rgba(0, 0, 0, 0.65);
	transform: translateY(0);
}
</style>