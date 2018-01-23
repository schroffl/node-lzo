#include "minilzo209/minilzo.h"

#include <node.h>
#include <v8.h>
#include <sstream>

#define ERR_INIT_FAILED (-128)

#include <node_buffer.h>

using namespace v8;

int compress(const unsigned char *input, unsigned char *output, lzo_uint in_len, lzo_uint& out_len) {
    char* wrkmem = (char*) malloc(LZO1X_1_MEM_COMPRESS);

    int result = lzo1x_1_compress(input, in_len, output, &out_len, wrkmem);

    free(wrkmem);

    return result;
}

lzo_uint decompress(const unsigned char *input, unsigned char *output, lzo_uint in_len, lzo_uint& out_len) {
    int r = lzo1x_decompress(input, in_len, output, &out_len, NULL);

    if (r == LZO_E_OK)
        return out_len;
    else
        return r;
}

void js_compress(const v8::FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);

    Handle<Object> inputBuffer = args[0]->ToObject();
    Handle<Object> outputBuffer = args[1]->ToObject();

    lzo_uint input_len = node::Buffer::Length(inputBuffer);
    lzo_uint output_len = node::Buffer::Length(outputBuffer);

    int result = compress(  (unsigned char *) node::Buffer::Data(inputBuffer),
                            (unsigned char *) node::Buffer::Data(outputBuffer),
                            input_len,
                            output_len );

    Local<Object> ret = Object::New(isolate);

    ret->Set(String::NewFromUtf8(isolate, "err"),
        Number::New(isolate, result));

    ret->Set(String::NewFromUtf8(isolate, "len"),
        Number::New(isolate, (int) output_len) );

    args.GetReturnValue().Set(ret);
}

void js_decompress(const v8::FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);

    Handle<Object> inputBuffer = args[0]->ToObject();
    Handle<Object> outputBuffer = args[1]->ToObject();

    lzo_uint input_len = node::Buffer::Length(inputBuffer);
    lzo_uint output_len = node::Buffer::Length(outputBuffer);

    lzo_uint len = decompress(  (unsigned char *) node::Buffer::Data(inputBuffer),
                                (unsigned char *) node::Buffer::Data(outputBuffer),
                                input_len,
                                output_len);

    int err = (int) len < 0 ? (int) len : 0;

    Local<Object> ret = Object::New(isolate);

    ret->Set(String::NewFromUtf8(isolate, "err"),
        Number::New(isolate, err));

    ret->Set(String::NewFromUtf8(isolate, "len"),
        Number::New(isolate, (int) len) );

    args.GetReturnValue().Set(ret);
}

void Init(Handle<Object> exports) {
    Isolate *isolate = Isolate::GetCurrent();

    int init_result = lzo_init();

    if(init_result != LZO_E_OK) {
        std::stringstream ss;

        ss << "lzo_init() failed and returned `" << init_result << "`. ";
        ss << "Please report this on GitHub: https://github.com/schroffl/node-lzo/issues";

        Local<String> err = String::NewFromUtf8(isolate, ss.str().c_str());

        isolate->ThrowException(Exception::Error(err));

        return;
    }

    // Compression
    exports->Set(String::NewFromUtf8(isolate, "compress"),
        FunctionTemplate::New(isolate, js_compress)->GetFunction());

    // Decompression
    exports->Set(String::NewFromUtf8(isolate, "decompress"),
        FunctionTemplate::New(isolate, js_decompress)->GetFunction());

    // Current lzo version
    exports->Set(String::NewFromUtf8(isolate, "version"),
        String::NewFromUtf8(isolate, lzo_version_string()));

    // Date for current lzo version
    exports->Set(String::NewFromUtf8(isolate, "versionDate"),
        String::NewFromUtf8(isolate, lzo_version_date()));
}

NODE_MODULE(node_lzo, Init);
