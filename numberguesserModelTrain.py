import os
import cv2
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf

#set podataka za našu aplikaciju, slike brojeva u 24x24 formatu
mnist = tf.keras.datasets.mnist

#dijelimo na testing i training podatke
#x-pixel podatci, y-klasifikacija, broj
(x_train, y_train), (x_test, y_test) = mnist.load_data()

#normaliziriamo pixele za treniranje modela
x_train = tf.keras.utils.normalize(x_train, axis=1)
x_test = tf.keras.utils.normalize(x_test, axis=1)

#model neuronske mreže - koristiti cemo bazicni sekvencijalni model
model = tf.keras.models.Sequential()
#dodajemo sloj u našem modelu - sloj poravnanja, grid od 28x28 pixela pretvara u jedan array od 728 pixela
model.add(tf.keras.layers.Flatten(input_shape=(28, 28)))
#dense layer - bazični sloj koji spaja svaki neuron jednog sloja sa neuronom drugog sloja
#relu je tip aktivacijske funkcije
model.add(tf.keras.layers.Dense(128, activation='relu'))
model.add(tf.keras.layers.Dense(128, activation='relu'))
#softmax osigurava da svih 10 neurona na kraju budu 1 neuron, zbraja sve prethodne slojeve i daje konačni odgovor
model.add(tf.keras.layers.Dense(10, activation='softmax'))

#komplajiramo model i biramo optimizatore
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

#dajemo podatke za trening modela, 3 puta će iterirati po istim podatcima
model.fit(x_train, y_train, epochs=3)

model.save('numberguesserModel.keras')

