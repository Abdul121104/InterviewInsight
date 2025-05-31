#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    cin.ignore();

    vector<vector<string>> v(n);
    set<string> tasks;

    for (int i = 0; i < n; i++) {
        string line;
        getline(cin, line);
        istringstream ss(line);
        string task;
        while (ss >> task) {
            v[i].push_back(task);
            tasks.insert(task);
        }
    }

    int m = v[0].size();
    unordered_map<string, vector<int>> ct;

    for (const string& task : tasks) {
        ct[task] = vector<int>(m, 0);
    }

    for (const auto& vote : v) {
        for (int pos = 0; pos < m; pos++) {
            ct[vote[pos]][pos]++;
        }
    }

    vector<string> ans;
    for (const string& task : tasks)
        ans.push_back(task);

    auto cmp = [&](string a, string b) {
        for (int i = 0; i < m; i++) {
            if (ct[a][i] != ct[b][i])
                return ct[a][i] > ct[b][i];
        }
        return a < b;
    };

    sort(ans.begin(), ans.end(), cmp);

    for (const string& task : ans) cout << task << " ";
    cout << endl;

    return 0;
}

// #include <iostream>
// #include <vector>
// #include <queue>
// #include <tuple>
// #include <algorithm>
// using namespace std;

// int main() {
//     ios::sync_with_stdio(false);
//     cin.tie(0);

//     int N;
//     cin >> N;
//     vector<long long> b(N);
//     for (int i = 0; i < N; i++) {
//         cin >> b[i];
//     }

//     long long base = 0;
//     for (long long x : b) {
//         base += x;
//     }

//     vector<vector<long long>> segments;
//     int i = 0;
//     while (i < N) {
//         if (b[i] != 0) {
//             vector<long long> seg;
//             while (i < N && b[i] != 0) {
//                 seg.push_back(b[i]);
//                 i++;
//             }
//             segments.push_back(seg);
//         } else {
//             i++;
//         }
//     }

//     long long total_extra = 0;

//     for (auto &seg : segments) {
//         int L = seg.size();
//         int k_segment = L / 2;

//         if (k_segment == 0) {
//             continue;
//         }

//         vector<int> prev(L, -1);
//         vector<int> next(L, -1);
//         for (int j = 0; j < L; j++) {
//             if (j > 0) {
//                 prev[j] = j - 1;
//             }
//             if (j < L - 1) {
//                 next[j] = j + 1;
//             }
//         }

//         priority_queue<tuple<long long, int, int>, vector<tuple<long long, int, int>>, greater<tuple<long long, int, int>>> pq;

//         for (int j = 0; j < L - 1; j++) {
//             long long cost = seg[j] + seg[j+1];
//             pq.push(make_tuple(cost, j, j+1));
//         }

//         int pairs_formed = 0;
//         while (pairs_formed < k_segment) {
//             if (pq.empty()) {
//                 break;
//             }
//             auto edge = pq.top();
//             pq.pop();
//             long long cost = get<0>(edge);
//             int i_index = get<1>(edge);
//             int j_index = get<2>(edge);

//             if (next[i_index] != j_index || prev[j_index] != i_index) {
//                 continue;
//             }

//             total_extra += cost;
//             pairs_formed++;

//             int left = prev[i_index];
//             int right = next[j_index];

//             if (left != -1) {
//                 next[left] = right;
//             }
//             if (right != -1) {
//                 prev[right] = left;
//             }

//             if (left != -1 && right != -1) {
//                 long long new_cost = seg[left] + seg[right];
//                 pq.push(make_tuple(new_cost, left, right));
//             }
//         }
//     }

//     cout << base + total_extra << endl;

//     return 0;
// }