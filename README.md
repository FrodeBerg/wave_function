### FrodeBergs wave function


This is my loose take on the increasingly popular Wave function collapse algorithm. Even though it takes heavy inspiration from others such as https://github.com/mxgmn/WaveFunctionCollapse the actual algorithm is pretty different. It is not finished and i will probably not finish it because my take on the algorithm is far more random than others wich kind of destroys the charm with the original algorithm.


# How it works


It creates 2 dimensional rules from an input image or canvas. These rules are generated with one pixel offsets regardless of how big the dimensions of the rules are, for example if the input is 10 pixels wide and the rule width is 3 it will generate 10 - 3 = 7 rules for each row. To later connect these rules it places each side of the rule in a hashmap divided into sides. If two opposite sides equal each other that means those two rules go together. It starts with choosing a starting tile, then shrinks the possibilities for all direct neighbors then adds them to the queue and repeats this process. This makes the algorithm super fast, being able to accept any input, rule and output sizes and what I thought would generate even cooler images than previous attempts. Even though this leads to the algorithm generating images that are locally similar to the input image they sadly are a bit too random.


# What is left


Finishing up the style and css but more importantly actually completing the algorithm. The algorithm doesn't make any random choices (except for the very first one) which means it generates only a partially complete image but doesn't complete it. Finishing the random choices means that the algorithm must be able to backtrack to correct eventual mistakes and that is much more work for a new algorithm that might not even be that impressive. I will probably create a new project from the ground up with a new algorithm, even though I love my approach :).


Thanks for reading!!
