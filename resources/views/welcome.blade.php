<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Jur') }}</title>

    <!-- Scripts -->
    <script>
        window.App = {!! json_encode([
            'name' => config('app.name')
        ]) !!};
    </script>
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body class="h-full font-sans text-grey-darkest">
    <div id="app" class="flex flex-col">
    </div>
</body>

</html>
