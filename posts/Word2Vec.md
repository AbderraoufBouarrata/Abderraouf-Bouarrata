---
title: 'Word2Vec'
date: 'Jan 31, 2023'
excerpt: 'Semantic text similarity on Quran'
cover_image: './word2vec.jpeg'
---

<br />

# Semantic Text Similarity
In contrast to merely contrasting their outward appearance, semantic text similarity(STS) refers to the degree of equivalence or similarity between the meanings of two or more pieces of text.
Instead of just matching words or phrases exactly, this entails contrasting the deeper meaning and context of words and phrases. 
In this tutorial we will be using __Word2Vec__ to compare the STS between words or sentences, we will also be using the Quran as a dataset aka corpus.

<br />

# What is Word2Vec ?

In order to represent words in a corpus of text, Word2Vec is a particular kind of neural network-based model that creates dense, continuous-valued vectors (also known as embeddings).
An unsupervised learning method is used to train the model on massive volumes of text data in order to predict context terms for a given target word.
Word vectors that are created as a result of this process capture the semantic and syntactic characteristics of words and can be applied to a number of NLP tasks, including text categorization, similarity matching, clustering, and more. 

<br />

# **1.Importing Libraries and Loading data**

```python
import nltk
import pandas as pd
import pyarabic.araby as araby
from nltk.tokenize import wordpunct_tokenize
from nltk.tokenize import word_tokenize
import pandas as pd
from nltk.tokenize import RegexpTokenizer
from nltk.corpus import stopwords
import arabicstopwords.arabicstopwords as stp
from farasa.stemmer import FarasaStemmer
nltk.download('punkt')
#Loading data from csv into data drame
quoran = pd.read_csv("qurantexttanzil.csv")
```

<br />

# **2.Data pre-processing**

data pre-processing is crucial to the accuracy of our model, we won't get into that in this article but you can read about it [here](https://ca.indeed.com/career-advice/career-development/data-preprocessing).

<br />

### 2.1.Removing diacritics(Tashkeel) from Quran

```python
quoran = pd.read_csv("qurantexttanzil.csv")
soura = quoran["text"]
b=[]
for a in soura:
    b.append(araby.strip_diacritics(a))
quoran['diacriticless'] = b
```
<br />

### 2.2.Tokenization

```python
tokenized = []
for i in b:
    print(wordpunct_tokenize(i))
    tokenized.append(wordpunct_tokenize(i))
# adding a new column in the data frame for "tokenized"
quoran["tokenized"] = tokenized
```

<br />

### 2.3.Removing stop words

```python
stopwords = ['فما','إنهم','وعلى','وأولئك','ومما','إليك','بما','والذين','فيه','لا','ذلك','ولا','عليهم','غير','الذين','إياك','إن','إنك','وإياك','سواء','ولهم','معكم','كانوا','مثلهم', 'كمثل','فلما','حوله','فهم','وأنتم','كنتم','ولن','تحتها','قبل','وهم','مثلا','أنه','وأما','كثيرا','إليه','جميعا','إني','قال','قالوا','ونحن','كلها','فلما','قلنا','وكان','فتكونا','عنها','بعضكم','لبعض','فإما','معكم',
         'وهي','أولم','كانت','سواء','هو','قال','لا','لكل','الذين','هذا','إنما','لك','يا','إذا','أن','عند','لها','الذي','لنا','في','لو','ذلك','إني','لكم','كذلك','قد','إليه','له','قالوا','ما','لهم','من','هل','وإن','مما','وهم','فيها','فيه','إذ','به','على','إن','حتى','بل','عليكم','أنا','هي','الأولى','لن','هم','حين','ليس','كل','بين','نحن','هؤلاء','ومن','إنه','بما','فإن','إنهم','ولا','عليهم','أم'
          ,'عن','أو','إنا','أدراك','إلا','وما','إلى','ثم','تكونوا','أول','وأن','يكون','قل','كان','عليكم','منا','منكم','لعلكم','وأنا','أيها','وإنما','كانت','إنها','عني','عليها','علينا','فإنها','منا','عنده','وليس','وإنا','أيها','و','وقد','بني','وكانوا','جاء','أحيانا','قبل','ولما','معهم' 
  ]
def stop_words_remover(word) :
        if not stp.is_stop(word): 
           if not word in  stopwords: return  ''.join(word)
        else: return None    
```

<br />

### 2.4.Stemming

```python
stemmer = FarasaStemmer()
def stem(ayah) :
     return stemmer.stem(ayah)

x= ",".join(quoran.diacriticless)
x=stem(x)
# adding a new column in the data frame for "stem_text"
quoran["stem_text"]=x.split(",")
```

Next we call in our function

```python
quran1 = [nltk.word_tokenize(i) for i in quoran['stem_text']]
quoran["stemed_and_removed"]= [
    [stop_words_remover(word) for word in ayah ] for ayah in quran1]
corpus = quoran["stemed_and_removed"].apply(lambda x: [item for item in x if item != None])
quoran["clean_text"]=corpus
```

<br />

### 2.5.Exporting


pre-processing data is both time and rescource consuming so we export the pre-processed data to a csv to avoid repition.

```python
quoran.to_csv('pre-treated-quoran.csv', encoding='utf-8')
```

<br />

# **3.Model creation and usage**

<br />

### 3.1.Model training 
```python
embedding_size = 100
window_size = 15
min_word = 0
down_sampling = 1e-2
```

```python
from gensim.models import Word2Vec
wv_model=Word2Vec(corpus,
                  vector_size=embedding_size,
                  window=window_size,
                  min_count=min_word,
                  workers=4,
                  seed=42,
                  epochs=30,
                  sg=1,
                  sample=down_sampling,
                  )
```
**corpus**: This is the input text data that will be used to train the model.

**vector_size**: This parameter specifies the dimensionality of the word embeddings generated by the model. The higher the dimensionality, the more information can be captured in the embeddings.

**window_size**: This parameter determines the size of the context window around a target word that will be used to predict surrounding words.

**min_count**: This parameter specifies the minimum frequency of a word that is required to be included in the model. Words that occur less frequently than this threshold will be excluded.

**workers**: This parameter specifies the number of worker threads to be used during the training process.

**seed**: This is a random seed that is used to initialize the model.

**epochs**: This parameter specifies the number of passes through the corpus that will be made during training.

**sg**: This parameter specifies the type of training algorithm to use, either Skip-Gram (sg=1) or Continuous Bag of Words (sg=0).

**sample**: This parameter is used for down-sampling frequent words in the corpus to prevent the model from being biased towards more common words. The value of this parameter determines the threshold for downsampling.

<br />

### 3.2.Finding words similair to X


similarity score can be calculated based on many methods, here we are going with cosine similarity which Compute the cosine distance between two keys, the closer to one the smaller the angle the greater the match.
while 0 means the verctors are at 90 deg and they are dissimilar, you can read about it in detail [here](https://radimrehurek.com/gensim/models/keyedvectors.html).
```python
semantically_similar_words_wv = {words: [item[0] for item in wv_model.wv.most_similar([words], topn=5)]
                  for words in ['الله']}

for k,v in semantically_similar_words_wv.items():
    print(k+":"+str(v))
# we can improve our search by indicating positive words and negative ones
wv_model.wv.most_similar(positive=['مريم','عيسى'], negative=['موسى'], topn=1)
```

<br />

### 3.3.Find similarity between two words


```python
print(wv_model.wv.similarity(w1='مريم', w2='عيسى'))
```

<br />

### 3.4.Find similarity between two given sentences


```python
s1 = 'قال الله'
s2 = ' محمد '
#Compute cosine distance between two keys, the closer to one the smaller the angle the greater the match
#while 0 means the verctors are at 90 deg and they are dissimilar
distance = wv_model.wv.n_similarity(s1.split(), s2.split())
print(distance)
```

<br />

### 3.5.Searching for similair sentences(ayah)


```python
def findSimilarSentence(arg):
    output = [{
        'sentence': '',
        'score': 0, 
        'index': 0,
    }]
    for ayah in quoran['diacriticless']:
        output.append({'sentence': ayah, 'score':  wv_model.wv.n_similarity(arg.lower().split(), ayah.lower().split()), 'index': quoran[quoran['diacriticless'] == ayah].index[0]})
    return output

temp = findSimilarSentence('إنك ميت وإنهم ميتون')
temp.sort(key=lambda x: x['score'], reverse=True)
temp[:10]
```
<br />

# **4.Conclusion**


In conclusion, semantic text similarity plays an important role in various natural language processing applications. Word2Vec is a powerful tool for capturing the meaning of words in a corpus of text and generating continuous-valued word embeddings. These embeddings can be used to compare the similarity between two pieces of text and identify the underlying semantic relationship between words. Word2Vec has proven to be a highly effective and scalable method for measuring semantic text similarity and has found widespread use in a variety of NLP tasks.

<br />

Find note book [here](https://github.com/AbderraoufBouarrata/Word2Vec-for-STS).
