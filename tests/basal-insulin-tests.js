/**
 * Unit tests for basal insulin recommendation logic
 * Run: node tests/basal-insulin-tests.js
 */

// Extract the core logic from the app
function getAgeThresholds() {
    return { basalHigh: 120, basalLow: 90, mealHigh: 180, mealLow: 70 };
}

function calculateBasalRecommendation(dose, readings) {
    const thresholds = getAgeThresholds();
    const avgReading = readings.reduce((a, b) => a + b, 0) / readings.length;
    const allHigh = readings.every(r => r > thresholds.basalHigh);
    const anyLow = readings.some(r => r < thresholds.basalLow);
    const isHighDose = dose > 100;
    const isLowDoseHighVar = dose < 5 && (Math.max(...readings) - Math.min(...readings) > 50);

    let action = 'stable';
    let newDose = dose;
    let t1dWarning = false;

    if (isHighDose || isLowDoseHighVar) {
        t1dWarning = true;
    }

    if (allHigh) {
        action = 'increase';
        newDose = parseFloat((dose * 1.1).toFixed(1));
    } else if (anyLow) {
        action = 'decrease';
        newDose = parseFloat((dose * 0.9).toFixed(1));
    }

    return { action, newDose, avgReading, t1dWarning };
}

// Test runner
let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        passed++;
        console.log(`  ✅ ${name}`);
    } catch (e) {
        failed++;
        console.log(`  ❌ ${name}: ${e.message}`);
    }
}

function assertEqual(actual, expected, msg) {
    if (actual !== expected) {
        throw new Error(`${msg || ''} Expected ${expected}, got ${actual}`);
    }
}

// --- Tests ---

console.log('\n🩸 Basal Insulin Recommendation Tests\n');

console.log('Thresholds:');
test('Adult thresholds: basalHigh = 120', () => {
    assertEqual(getAgeThresholds().basalHigh, 120);
});
test('Adult thresholds: basalLow = 90', () => {
    assertEqual(getAgeThresholds().basalLow, 90);
});

console.log('\nAll readings above 120 (high):');
test('Recommends 10% increase when all readings > 120', () => {
    const result = calculateBasalRecommendation(20, [130, 140, 150]);
    assertEqual(result.action, 'increase');
    assertEqual(result.newDose, 22);
});
test('10% increase from 50 units = 55', () => {
    const result = calculateBasalRecommendation(50, [125, 130, 135]);
    assertEqual(result.newDose, 55);
});
test('Does NOT recommend increase if only some readings are high', () => {
    const result = calculateBasalRecommendation(20, [130, 100, 150]);
    assertEqual(result.action, 'stable');
});

console.log('\nAny reading below 90 (low):');
test('Recommends 10% decrease when any reading < 90', () => {
    const result = calculateBasalRecommendation(20, [85, 110, 115]);
    assertEqual(result.action, 'decrease');
    assertEqual(result.newDose, 18);
});
test('10% decrease from 30 units = 27', () => {
    const result = calculateBasalRecommendation(30, [80, 100, 110]);
    assertEqual(result.newDose, 27);
});
test('Low reading takes priority over high readings', () => {
    // Even if 2 readings are high but 1 is low, decrease wins
    const result = calculateBasalRecommendation(20, [85, 130, 140]);
    assertEqual(result.action, 'decrease');
});

console.log('\nReadings in range (90-120):');
test('Stable when all readings between 90 and 120', () => {
    const result = calculateBasalRecommendation(20, [95, 100, 110]);
    assertEqual(result.action, 'stable');
    assertEqual(result.newDose, 20);
});
test('Stable at exactly 90 and 120 (boundary values)', () => {
    const result = calculateBasalRecommendation(20, [90, 120, 100]);
    assertEqual(result.action, 'stable');
});

console.log('\nT1D pattern detection:');
test('Flags T1D warning for doses > 100 units', () => {
    const result = calculateBasalRecommendation(105, [95, 100, 110]);
    assertEqual(result.t1dWarning, true);
});
test('Flags T1D for low dose + high variability', () => {
    const result = calculateBasalRecommendation(4, [60, 120, 100]);
    assertEqual(result.t1dWarning, true);
});
test('No T1D warning for normal dose + normal variability', () => {
    const result = calculateBasalRecommendation(20, [95, 100, 110]);
    assertEqual(result.t1dWarning, false);
});
test('No T1D warning for low dose + low variability', () => {
    const result = calculateBasalRecommendation(4, [95, 100, 105]);
    assertEqual(result.t1dWarning, false);
});

console.log('\nAverage calculation:');
test('Average of 100, 110, 120 = 110', () => {
    const result = calculateBasalRecommendation(20, [100, 110, 120]);
    assertEqual(result.avgReading, 110);
});
test('Average of 80, 90, 130 = 100', () => {
    const result = calculateBasalRecommendation(20, [80, 90, 130]);
    assertEqual(result.avgReading, 100);
});

console.log('\nEdge cases:');
test('Very high readings (300+)', () => {
    const result = calculateBasalRecommendation(20, [300, 350, 400]);
    assertEqual(result.action, 'increase');
});
test('Very low readings (40s)', () => {
    const result = calculateBasalRecommendation(20, [45, 50, 55]);
    assertEqual(result.action, 'decrease');
});
test('Mixed extreme readings (low wins)', () => {
    const result = calculateBasalRecommendation(20, [50, 300, 200]);
    assertEqual(result.action, 'decrease');
});
test('Dose of 1 unit with decrease = 0.9', () => {
    const result = calculateBasalRecommendation(1, [85, 80, 75]);
    assertEqual(result.newDose, 0.9);
});

// Summary
console.log(`\n${'='.repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);
console.log(`${'='.repeat(40)}\n`);

process.exit(failed > 0 ? 1 : 0);
