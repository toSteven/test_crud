function Aside() {
  return (
    <aside className="container">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">
            Dashboard
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Record
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            ---
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-disabled="true">
            ---
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Aside;
