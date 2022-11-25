@if (session('status'))
    
    <div class="alert alert-success my-2">
        {{ session('status') }}
    </div>

@endif