import { join } from 'path';
import resultHTML from '../results.html';
import '../style.css';

// NOTE: feel free to refactor for a more interesting framework like Vue
// Load results into document.
const body = document.querySelector('body');
if (!body) {
  throw new Error('body does not exist! Make sure report/index.html is formatted correctly.');
}
body.innerHTML = resultHTML;

// Find the comparison section.
const suites = Array.from(body.children);

// delete the path line.
suites.forEach((suite) => {
  suite.querySelectorAll('dt').forEach((line) => {
    if(line.innerHTML.trim().endsWith('.js'))
    {
      line.style.display = 'none';
    }
  })
})
const comparisonSection = suites.find((section) => {
  const [header] = section.children;
  return header.textContent === '[AUTOMATED COMPARISON TEST]';
});
if (!comparisonSection) {
  throw new Error('Page Comparison suite is missing from the html results');
}
const [, comparisonChildList] = comparisonSection.children;
const contextSections = Array
  .from(comparisonChildList.children)
  .filter((contextSection) => contextSection.tagName === 'SECTION')
  .filter((contextSection) => {
    const [, descriptionList] = contextSection.children;
    return descriptionList.children.length;
  });
