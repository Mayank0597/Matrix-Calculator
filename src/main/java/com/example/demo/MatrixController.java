package com.example.demo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MatrixController {

    @PostMapping("/calculate")
    public int[][] calculateMatrix(@RequestBody MatrixRequest matrixRequest) {
        int[][] matrixA = matrixRequest.getMatrixA();
        int[][] matrixB = matrixRequest.getMatrixB();

        // Validate matrix dimensions for multiplication
        if (matrixA[0].length != matrixB.length) {
            throw new IllegalArgumentException("Number of columns in Matrix A must be equal to number of rows in Matrix B");
        }

        return multiplyMatrices(matrixA, matrixB);
    }

    private int[][] multiplyMatrices(int[][] matrixA, int[][] matrixB) {
        int rowsA = matrixA.length;
        int colsA = matrixA[0].length;
        int colsB = matrixB[0].length;

        int[][] result = new int[rowsA][colsB];

        for (int i = 0; i < rowsA; i++) {
            for (int j = 0; j < colsB; j++) {
                for (int k = 0; k < colsA; k++) {
                    result[i][j] += matrixA[i][k] * matrixB[k][j];
                }
            }
        }

        return result;
    }
}
