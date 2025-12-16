
export interface TestCase {
  input: string;
  expected: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  starterCode: string;
  testCases: TestCase[];
  solution: string; // For mock validation
}

export const codingProblems: CodingProblem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
    
You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    starterCode: `function twoSum(nums, target) {
  // Write your code here
  
}`,
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]' },
      { input: 'nums = [3,2,4], target = 6', expected: '[1, 2]' },
      { input: 'nums = [3,3], target = 6', expected: '[0, 1]' }
    ],
    solution: 'twoSum'
  },
  {
    id: '2',
    title: 'Reverse String',
    difficulty: 'Easy',
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    starterCode: `function reverseString(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: 's = ["h","e","l","l","o"]', expected: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]' }
    ],
    solution: 'reverseString'
  },
  {
    id: '3',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.`,
    starterCode: `function isPalindrome(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: 's = "A man, a plan, a canal: Panama"', expected: 'true' },
      { input: 's = "race a car"', expected: 'false' }
    ],
    solution: 'isPalindrome'
  },
  {
    id: '4',
    title: 'Fibonacci Number',
    difficulty: 'Medium',
    description: `The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.`,
    starterCode: `function fib(n) {
  // Write your code here
  
}`,
    testCases: [
      { input: 'n = 2', expected: '1' },
      { input: 'n = 3', expected: '2' },
      { input: 'n = 4', expected: '3' }
    ],
    solution: 'fib'
  }
];
