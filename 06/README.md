# Шаги для запуска

1. Запуск контейнера с БД postgresql и pgAdmin4
```zsh
$ docker compose --file ./compose.yaml up -d
```

2. Перейти в директорию проекта (RazorPagesApp/Task_5)
   
3. Билд проекта
   
```zsh
$ dotnet build
```

4. Обновить БД
```zsh
$ dotnet ef database update
```

5. Запуск проекта
```zsh
$ dotnet run
```