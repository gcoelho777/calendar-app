<form action="{{ route("events.store") }}" method="POST">
    @csrf
    <input type="number" name="user_id" value="1">
    <input type="text" name="title">
    <textarea name="description" cols="30" rows="10"></textarea>
    <input type="text" name="location">
    <input type="datetime" name="start_time">
    <input type="datetime" name="end_time">
    <select name="status">
        <option value="open" selected>Aberto</option>
        <option value="closed">Encerrado</option>
        <option value="cancelled">Cancelado</option>
    </select>
    <button type="submit"></button>
</form>