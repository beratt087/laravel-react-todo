@extends('layout.master')

@section('title', 'Dashboard')

@section('jsx_href')
    @vite('resources/js/App.jsx')
@endsection

@section('content')
    <div id="app"></div>
@endsection
