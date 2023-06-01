<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Todo App - @yield('title', '?')</title>

    @viteReactRefresh
    @yield('jsx_href')

    <script>
        window.csrfToken = '{{ csrf_token() }}';
    </script>
</head>
<body>
@yield('content')
</body>
</html>
