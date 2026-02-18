1. Difference between `null` and `undefined`
   Answer: `undefined` হলো একটি প্রিমিটিভ ডাটা টাইপ যেখানে সাধারণত ভেরিএবল ডেক্লায়ার করা হয়েছে কিন্তূ এর কোনো মান এখনো সেট করা হয়নি। এটা সাধারণত জাভাস্ক্রিপ্ট ইঞ্জিন থেকে দেয় যখন কোনো ডেভেলপার কোনও ভেরিয়েবল এর মান সেট করেনি। typeof অপারেটর দিয়ে দেখলে এর টাইপ পাওয়া যায় undefined. অন্যদিকে null সাধারণত ভেরিয়েবল এই অনুপস্থিতি বুঝায়। কোনো ডেভেলপার ইচ্ছাকৃতভাবে কোনো ভ্যারিয়েবলে "খালি" বা "কিছুই নেই" বোঝাতে এটি সেট করে।

2.Use of the `map()` function in JavaScript and its difference from `forEach()`
Answer: map() দিয়ে কোনো Array কে iterate করা হয়। Iterate করার পর ফাংশনাল উপায়ে উক্ত array এর প্রতিটি উপাদান নিয়ে একটি নতুন array তৈরি করে । কিন্তু এতে আগের array সম্পুর্ণ অক্ষত থাকে। forEach()ও iterate করে। কিন্তু এক্ষেত্রে নতুন কোন array তৈরি করে না। বরং পুরাতন array এর সবগুলো উপাদানের উপর কোন ফাংশন প্রয়োগ করে তা ইউ আই তে console.log বা অনুরুপ অন্যান্য কাজগুলো করে।

3. The difference between `==` and `===`
   Answer: == শুধুমাত্র value চেক করে কিন্তু === value এবং type চেক করে।

4. The significance of `async`/`await` in fetching API data
   Answer: i. ডিবাগিং সহজ করে।
   ii.জাভাস্ক্রপ্ট এর মেইন থ্রেডকে ব্লক করে না।
   iii. conditional logic সহজ করে।
   iv. Error হ্যান্ডেল করা সহজ হয়।
   v.Data Fetch করা সহজ হয়।

5.The concept of Scope in JavaScript (Global, Function, Block)
Answer:Global Scope: ভেরিয়েবলটি ফাংশনের বাইরে ডিক্লেয়ার করা হয় এবং কোডের যেকোনো জায়গা থেকে এটি অ্যাক্সেস করা যায়।
Function Scope: var দিয়ে ফাংশনের ভেতর ডিক্লেয়ার করা ভেরিয়েবল শুধু ওই ফাংশনের ভেতরেই কাজ করে, বাইরে নয়।
Block Scope: let এবং const দিয়ে ডিক্লেয়ার করা ভেরিয়েবল শুধুমাত্র নির্দিষ্ট কার্লি ব্র্যাকেট { } বা ব্লকের ভেতরেই সীমাবদ্ধ থাকে।
