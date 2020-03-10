package com.agoda.models;

import javax.persistence.*;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
public class User {
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Hotel> hotels;

    public User() {
        super();
    }

    public User(int id, String name, String password, Hotel... hotels) {
        super();
        this.id = id;
        this.name = name;
        this.password = password;
        this.hotels = Stream.of(hotels).collect(Collectors.toSet());
        this.hotels.forEach(x -> x.setUser(this));
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
