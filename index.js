const courses = [
	{ name: "Courses in England", prices: [0, 100] },
	{ name: "Courses in Germany", prices: [500, null] },
	{ name: "Courses in Italy", prices: [100, 200] },
	{ name: "Courses in Russia", prices: [null, 400] },
	{ name: "Courses in China", prices: [50, 250] },
	{ name: "Courses in USA", prices: [200, null] },
	{ name: "Courses in Kazakhstan", prices: [56, 324] },
	{ name: "Courses in France", prices: [null, null] },
];

// const requiredRange1 = [null, 200];
// const requiredRange2 = [100, 350];
// const requiredRange3 = [200, null];

const requiredRanges = [
	[null, 200],
	[100, 350],
	[200, null]
];



const getFilteredCourses = (courses = [], requiredRange = []) => {
	if (!courses.length) return console.log('Нет курсов.');
	if (!requiredRange.length) return console.log('Нет фильтров.');

	let [requiredRangeMin, requiredRangeMax] = requiredRange;
	if (requiredRangeMin === null) requiredRangeMin = -Infinity;
	if (requiredRangeMax === null) requiredRangeMax = Infinity;

	if (requiredRangeMin > requiredRangeMax) return console.log('Запрошенный фильтр сломан)');

	// Фильтр на всякий случай, вдруг у нас в диапазоне каким-то образом минимальная цена оказалась больше максимальной.
	// Вдруг какой-нибудь ошибочный диапазон пришел.
	// Замена null на +-бесконечности для корректных мат. операций сравнения.
	courses = courses.filter(({ prices: [courseRangeMin, courseRangeMax] }) => courseRangeMax >= courseRangeMin).map(course => ({
		...course,
		prices: [
			course.prices[0] || -Infinity,
			course.prices[1] || Infinity
		]
	}));

	// Фильтруем, решим задачу от противного: если
	// максимальная граница запрашиваемого фильтра меньше минимальной у курса
	// ИЛИ
	// минимальная граница запрашиваемого фильтра больше максимальной у курса
	// ТО
	// нам такие варианты не подходят
	// Все остальные варианты удовлетворяют условию.
	return courses.filter(({ prices: [courseRangeMin, courseRangeMax] }) => !((courseRangeMin > requiredRangeMax) || (requiredRangeMin > courseRangeMax)));
};

const startTests = () => {
	requiredRanges.forEach(requiredRange => {
		console.log('Запускаем тест для:');
		console.log(courses);

		console.log('С фильтром по цене:');
		console.log(requiredRange);

		console.log('Результат: ');
		console.log(getFilteredCourses(courses, requiredRange));
	});
};

startTests();