export const TagCategories = ['UG COURSE', 'PG COURSE','EXECUTIVE EDUCATION','ADVANCED DIPLOMA',"JOB GUARANTEED PROGRAMS","Doctorate/Ph.D","Skilling & Certificate Programs","Study Abroad Online"]

export const courseDuration = [
	'annual',
	'6months',
	'3months',
	'onetime'
]

export function unionArraysByProperty(array1, array2, propertyName) {
	const map = {};
	const union = [];
  
	// Process the first array
	for (const item of array1) {
		const key = item[propertyName];
		if (!map[key]) {
			map[key] = true;
			union.push(item);
		}
	}
  
	// Process the second array
	for (const item of array2) {
		const key = item[propertyName];
		if (!map[key]) {
			map[key] = true;
			union.push(item);
		}
	}
  
	return union;
}