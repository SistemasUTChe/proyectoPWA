@extends('layouts.master')

@section('content')
    <div class="container box">
        <div class="row justify-content-center">
            <div class="col-md-12">


                <div id="app">
                    <usuario-component></usuario-component>
                </div>

                <a href="{{ route('inicio') }}" class="btn btn-success">
                Mensajero             
                </a>
            </div>
        </div>
    </div>

 @endsection