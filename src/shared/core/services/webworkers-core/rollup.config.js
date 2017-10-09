import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

/*
export default {
    input: './src/shared/core/common/webworkers-core/ww-socket.loader.ts',
    output: {
        file: './dist/ww-skt-loader.js',
        format: "iife",
        sourcemap: false,
        name: 'app'
    },
    treeshake: true,
    plugins: [
        typescript({             
            "typescript": require('typescript') 
        }),
        commonjs(),
        resolve({
            jsnext: true,
            main: true,
            extensions: ['.js', '.json']            
        }),
        uglify()
    ]
}; 
*/

export default {
    input: './src/shared/core/services/webworkers-core/ww-socket.loader.ts',
    output: {
        file: './src/assets/workers/socket-loader.js',
        format: "umd",
        sourcemap: "inline",
        name: 'app'
    },
    treeshake: true,
    plugins: [
        typescript({             
            "typescript": require('typescript') 
        }),
        commonjs(),
        resolve({
            jsnext: true,
            main: true,
            extensions: ['.js', '.json']            
        })
    ]
}; 